import puppeteer from 'puppeteer';
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BANNER_STORY =
  'C:\\Users\\timbe\\kokopelli-ec\\public\\ads-v20\\banner-v20-story-cat-1080x1920.png';
const BANNER_FEED =
  'C:\\Users\\timbe\\kokopelli-ec\\public\\ads-v20\\banner-v20-feed-cat-1080x1080.png';
const PROFILE = 'C:\\Users\\timbe\\.cache\\chrome-devtools-mcp\\chrome-profile';
const AD_ID = '120242139032230447';
const ACT = '518379218762642';

function cleanupStaleProfile() {
  try {
    const out = execSync(
      `wmic process where "name='chrome.exe'" get processid,commandline /format:csv`,
      { encoding: 'utf8' }
    );
    const lines = out.split('\n').filter((l) => l.includes('chrome-devtools-mcp'));
    const pids = new Set();
    for (const l of lines) {
      const cols = l.trim().split(',');
      const pid = cols[cols.length - 1];
      if (/^\d+$/.test(pid)) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /T /F`, { stdio: 'ignore' });
        console.log(`🧹 killed stale chrome PID ${pid}`);
      } catch {}
    }
  } catch (e) {
    console.warn('cleanup skipped:', e.message);
  }
  for (const f of ['SingletonLock', 'SingletonCookie', 'SingletonSocket', 'lockfile']) {
    const p = join(PROFILE, f);
    if (existsSync(p)) {
      try {
        rmSync(p, { force: true });
        console.log(`🧹 removed ${f}`);
      } catch {}
    }
  }
}

async function shot(page, tag) {
  await page.screenshot({ path: `ss-${tag}.jpg`, quality: 60 }).catch(() => {});
  console.log(`📸 ss-${tag}.jpg`);
}

async function dumpInteractive(page, tag) {
  const dump = await page.evaluate(() => {
    const result = [];
    const all = document.querySelectorAll(
      'button, a, [role="button"], [role="menuitem"], [role="dialog"]'
    );
    for (const el of all) {
      const t = (el.innerText || '').trim().substring(0, 60).replace(/\s+/g, ' ');
      const tag = el.tagName;
      const role = el.getAttribute('role') || '';
      const popup = el.getAttribute('aria-haspopup') || '';
      const rect = el.getBoundingClientRect();
      if (t.length > 0 && rect.height > 0 && rect.width > 0) {
        result.push({ t, tag, role, popup, y: Math.round(rect.y) });
      }
    }
    return result;
  });
  console.log(`📋 [${tag}] ${dump.length} elements`);
  for (const el of dump) {
    console.log(`  y=${el.y} <${el.tag}> role=${el.role} popup=${el.popup} "${el.t}"`);
  }
  return dump;
}

async function clickByText(page, text, opts = {}) {
  return await page.evaluate(
    ({ text, opts }) => {
      const all = document.querySelectorAll(
        'button, a, [role="button"], [role="menuitem"], div, span'
      );
      for (const el of all) {
        const t = (el.innerText || '').trim();
        const matches = opts.exact ? t === text : t.includes(text);
        if (!matches) continue;
        if (opts.minY != null && el.getBoundingClientRect().y < opts.minY) continue;
        if (opts.maxY != null && el.getBoundingClientRect().y > opts.maxY) continue;
        if (el.offsetHeight === 0) continue;
        el.scrollIntoView({ block: 'center' });
        el.click();
        return { ok: true, y: Math.round(el.getBoundingClientRect().y), text: t.substring(0, 80) };
      }
      return { ok: false };
    },
    { text, opts }
  );
}

// Find best-match element and return CENTER coords for trusted page.mouse.click().
// Prefers the smallest leaf-like element (actual button) over wrapping containers.
async function findClickCoords(page, text, opts = {}) {
  return await page.evaluate(
    ({ text, opts }) => {
      const sels = opts.selector || 'button, a, [role="button"], [role="menuitem"], div, span';
      const all = document.querySelectorAll(sels);
      const cands = [];
      for (const el of all) {
        const t = (el.innerText || '').trim();
        const matches = opts.exact ? t === text : t.includes(text);
        if (!matches) continue;
        const r = el.getBoundingClientRect();
        if (r.height === 0 || r.width === 0) continue;
        if (opts.minY != null && r.y < opts.minY) continue;
        if (opts.maxY != null && r.y > opts.maxY) continue;
        if (opts.minX != null && r.x < opts.minX) continue;
        cands.push({ el, r, area: r.width * r.height, textLen: t.length });
      }
      if (cands.length === 0) return { ok: false };
      // Prefer the smallest leaf (least text, smallest area) — that's the real button.
      cands.sort((a, b) => a.textLen - b.textLen || a.area - b.area);
      const pick = cands[0];
      pick.el.scrollIntoView({ block: 'center' });
      const r = pick.el.getBoundingClientRect();
      return {
        ok: true,
        x: Math.round(r.x + r.width / 2),
        y: Math.round(r.y + r.height / 2),
        w: Math.round(r.width),
        h: Math.round(r.height),
        text: (pick.el.innerText || '').trim().substring(0, 60),
        candidates: cands.length,
      };
    },
    { text, opts }
  );
}

// Trusted-gesture click via CDP mouse events (fixes React handlers that ignore el.click()).
async function mouseClickByText(page, text, opts = {}) {
  const c = await findClickCoords(page, text, opts);
  if (!c.ok) return c;
  await page.mouse.move(c.x, c.y);
  await sleep(150);
  await page.mouse.click(c.x, c.y, { delay: 80 });
  return c;
}

// Wait until the placement-edit modal title "配置N件を編集" disappears.
async function waitForModalClose(page, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const stillOpen = await page.evaluate(() => {
      const all = document.querySelectorAll('div, h1, h2, h3, span');
      for (const el of all) {
        const t = (el.innerText || '').trim().split('\n')[0];
        if (/^配置\d+件を編集$/.test(t) && el.offsetHeight > 0) return true;
      }
      return false;
    });
    if (!stillOpen) return true;
    await sleep(1000);
  }
  return false;
}

async function uploadInModal(page, file) {
  await sleep(4000);
  await shot(page, 'modal-open');

  // Step 1: Open the media picker only if it's not already open.
  // The picker opens via "変更" — but it's a toggle: clicking when already open closes it.
  // Detect picker presence by looking for the "+ アップロード" button OR "メディアを変更" header.
  async function pickerOpen() {
    return await page.evaluate(() => {
      const all = document.querySelectorAll('div, button, [role="button"]');
      for (const el of all) {
        const t = (el.innerText || '').trim();
        if (
          (t === 'アップロード' || t === 'メディアを変更' || t === 'メディアを検索') &&
          el.offsetHeight > 0
        ) {
          return true;
        }
      }
      return false;
    });
  }
  let isOpen = await pickerOpen();
  console.log(`📦 picker already open?: ${isOpen}`);
  if (!isOpen) {
    const change = await clickByText(page, '変更', { exact: true });
    if (!change.ok) {
      console.warn('"変更" button not found');
      return false;
    }
    console.log(`🖱️ "変更" clicked @ y=${change.y}`);
    await sleep(4000);
    isOpen = await pickerOpen();
    console.log(`📦 picker open after click?: ${isOpen}`);
    if (!isOpen) {
      // Maybe the click closed it (toggle); try clicking again
      const change2 = await clickByText(page, '変更', { exact: true });
      if (change2.ok) console.log(`🖱️ "変更" re-clicked @ y=${change2.y}`);
      await sleep(3500);
      isOpen = await pickerOpen();
      console.log(`📦 picker open after retry?: ${isOpen}`);
    }
  }
  await shot(page, 'picker-open');

  // CRITICAL: Use page.mouse.click() (real user-gesture trusted event) on the "+ アップロード" button.
  // .click() via DOM is blocked by browser file-dialog security policy.
  // Find the button center coordinates first.
  const uploadBtnCoords = await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"], button, [role="button"]');
    for (const b of buttons) {
      const t = (b.innerText || '').trim();
      // Match "アップロード" exactly OR with "+ " prefix from icon
      if (t === 'アップロード' || t === '+ アップロード' || /^[\s+]*アップロード\s*$/.test(t)) {
        const r = b.getBoundingClientRect();
        if (r.height === 0 || r.width === 0) continue;
        // Skip the source dropdown which has aria-haspopup
        if (b.getAttribute('aria-haspopup') === 'menu') continue;
        b.scrollIntoView({ block: 'center' });
        return {
          ok: true,
          x: Math.round(r.x + r.width / 2),
          y: Math.round(r.y + r.height / 2),
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: t,
        };
      }
    }
    return { ok: false };
  });
  console.log(`🎯 アップロード button coords:`, uploadBtnCoords);

  if (uploadBtnCoords.ok) {
    const fcPromise = page.waitForFileChooser({ timeout: 15000 }).catch(() => null);
    await page.mouse.move(uploadBtnCoords.x, uploadBtnCoords.y);
    await sleep(200);
    await page.mouse.click(uploadBtnCoords.x, uploadBtnCoords.y, { delay: 80 });
    console.log(`🖱️ mouse-clicked アップロード @ (${uploadBtnCoords.x},${uploadBtnCoords.y})`);
    await sleep(2000);
    await shot(page, 'after-mouse-click-upload');
    const fc = await fcPromise;
    if (fc) {
      try {
        await fc.accept([file]);
        console.log(`✅ uploaded via mouse.click → fileChooser`);
        await sleep(10000);
        await shot(page, 'after-upload-accept');
        return true;
      } catch (e) {
        console.warn(`fc.accept failed:`, e.message);
      }
    } else {
      console.warn(`⚠️ no fileChooser appeared after mouse click`);
    }
    // Check inputs after the trusted click
    const inputs = await page.$$('input[type="file"]');
    console.log(`📎 inputs after mouse.click: ${inputs.length}`);
    if (inputs.length > 0) {
      try {
        await inputs[inputs.length - 1].uploadFile(file);
        console.log(`✅ uploaded via input after mouse.click`);
        await sleep(10000);
        return true;
      } catch (e) {
        console.warn('input upload failed:', e.message);
      }
    }
  }

  // Helper: try to accept file via chooser/input after a candidate click
  async function tryUpload(label, doClick) {
    const fcPromise = page.waitForFileChooser({ timeout: 5000 }).catch(() => null);
    const r = await doClick();
    if (r && !r.ok) return false;
    if (r) console.log(`🖱️ ${label} @ y=${r.y}`);
    const fc = await fcPromise;
    if (fc) {
      try {
        await fc.accept([file]);
        console.log(`✅ uploaded via chooser (${label})`);
        await sleep(8000);
        return true;
      } catch (e) {
        console.warn(`chooser accept failed (${label}):`, e.message);
      }
    }
    await sleep(1500);
    const inputs = await page.$$('input[type="file"]');
    if (inputs.length > 0) {
      try {
        await inputs[inputs.length - 1].uploadFile(file);
        console.log(`✅ uploaded via input[type=file] (${label})`);
        await sleep(8000);
        return true;
      } catch (e) {
        console.warn(`input upload failed (${label}):`, e.message);
      }
    }
    return false;
  }

  // Step 2: PRIMARY PATH — Click the "アカウントの画像" SOURCE DROPDOWN (aria-haspopup="menu")
  // This opens a menu with options like "コンピューターから" / "デバイスから" / "ファイルを選択"
  const sourceDropdown = await page.evaluate(() => {
    const all = document.querySelectorAll('[aria-haspopup="menu"]');
    for (const el of all) {
      const t = (el.innerText || '').trim();
      if (t === 'アカウントの画像' || /アカウント|画像ライブラリ/.test(t)) {
        if (el.offsetHeight === 0) continue;
        el.scrollIntoView({ block: 'center' });
        el.click();
        return { ok: true, y: Math.round(el.getBoundingClientRect().y), text: t };
      }
    }
    return { ok: false };
  });
  console.log(`🖱️ source dropdown:`, sourceDropdown);
  if (sourceDropdown.ok) {
    await sleep(2000);
    await shot(page, 'source-menu-open');
    // Now try to click any of the upload-from-device options in the opened menu
    const menuOptions = [
      'コンピューターから',
      'コンピュータから',
      'デバイスから',
      'PCから',
      'パソコンから',
      'ファイルから',
      'アップロード',
    ];
    for (const opt of menuOptions) {
      const ok = await tryUpload(`menu:${opt}`, () => clickByText(page, opt, { exact: true }));
      if (ok) return true;
    }
    // Try menuitem role too
    const menuItem = await page.evaluate(() => {
      const items = document.querySelectorAll('[role="menuitem"], [role="menuitemradio"]');
      const result = [];
      for (const i of items) {
        const t = (i.innerText || '').trim();
        if (t.length > 0 && i.offsetHeight > 0) {
          result.push({ t, y: Math.round(i.getBoundingClientRect().y) });
        }
      }
      return result;
    });
    console.log(`📋 menu items:`, JSON.stringify(menuItem));
  }

  // Step 3: FALLBACK — try clicking "アップロード" button + check input[type=file]
  await sleep(1000);
  const ok2 = await tryUpload('button:アップロード', () =>
    clickByText(page, 'アップロード', { exact: true })
  );
  if (ok2) return true;

  // Step 4: FALLBACK — direct input[type=file] anywhere
  await sleep(1500);
  const inputs = await page.$$('input[type="file"]');
  console.log(`📎 inputs in DOM: ${inputs.length}`);
  if (inputs.length > 0) {
    try {
      await inputs[inputs.length - 1].uploadFile(file);
      console.log(`✅ uploaded via direct input`);
      await sleep(8000);
      return true;
    } catch (e) {
      console.warn('direct input upload failed:', e.message);
    }
  }

  // Step 5: FALLBACK — search across iframes
  for (const frame of page.frames()) {
    try {
      const fInputs = await frame.$$('input[type="file"]');
      if (fInputs.length > 0) {
        console.log(`📎 inputs in frame ${frame.url()}: ${fInputs.length}`);
        await fInputs[fInputs.length - 1].uploadFile(file);
        console.log(`✅ uploaded via frame input`);
        await sleep(8000);
        return true;
      }
    } catch (e) {}
  }

  // Step 6: FALLBACK — sub triggers
  const subTriggers = [
    'ファイルを選択',
    'コンピューターから',
    'コンピュータから',
    'デバイスから',
    'ファイルを追加',
  ];
  for (const t of subTriggers) {
    const ok = await tryUpload(`sub:${t}`, () => clickByText(page, t));
    if (ok) return true;
  }

  await shot(page, 'upload-failed');
  return false;
}

async function scrollUntilVisible(page, label, maxScrolls = 60) {
  for (let i = 0; i < maxScrolls; i++) {
    const found = await page.evaluate((label) => {
      const all = document.querySelectorAll('div');
      for (const el of all) {
        const t = (el.innerText || '').trim();
        if (!t.startsWith(label)) continue;
        if (t.length > 200) continue;
        const r = el.getBoundingClientRect();
        if (r.height > 30 && r.height < 200 && r.width > 200) {
          if (r.top > 50 && r.bottom < window.innerHeight - 50) {
            return { ok: true, top: Math.round(r.top) };
          }
          el.scrollIntoView({ block: 'center' });
          return { ok: 'scrolled', top: Math.round(r.top) };
        }
      }
      return { ok: false };
    }, label);
    if (found.ok === true) return true;
    if (found.ok === 'scrolled') {
      await sleep(500);
      continue;
    }
    // Not found at all yet — scroll panel
    await page.evaluate(() => {
      // Find the scrollable inner panel (Meta uses scrollable divs)
      const scrollables = Array.from(document.querySelectorAll('div')).filter((el) => {
        const s = getComputedStyle(el);
        return (
          (s.overflowY === 'auto' || s.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight + 50
        );
      });
      for (const s of scrollables) {
        s.scrollTop += 200;
      }
      window.scrollBy(0, 200);
    });
    await sleep(300);
  }
  return false;
}

async function editGroup(page, formatLabel, file) {
  console.log(`\n=== Editing ${formatLabel} group ===`);

  // 1. Scroll the format row into viewport first (do not press Escape — closes edit modal)
  const scrolled = await scrollUntilVisible(page, formatLabel);
  console.log(`scroll to ${formatLabel}:`, scrolled);
  await shot(page, `pre-expand-${formatLabel}`);

  // 2. Expand the format row by clicking it (rows show ▾ chevron, collapsed)
  const expanded = await page.evaluate((label) => {
    // find a row whose visible text starts with the label and has small height (collapsed row)
    const all = document.querySelectorAll('div, [role="button"]');
    const candidates = [];
    for (const el of all) {
      const t = (el.innerText || '').trim();
      if (!t.startsWith(label)) continue;
      if (t.length > 200) continue; // skip large containers
      const rect = el.getBoundingClientRect();
      if (rect.height < 30 || rect.height > 200) continue;
      if (rect.width < 200) continue;
      candidates.push({ el, t, h: rect.height, w: rect.width, y: rect.y });
    }
    // Prefer the SHORTEST text candidate (most leaf-like row)
    candidates.sort((a, b) => a.t.length - b.t.length);
    if (candidates.length === 0) return { ok: false };
    const pick = candidates[0];
    pick.el.scrollIntoView({ block: 'center' });
    pick.el.click();
    return {
      ok: true,
      y: Math.round(pick.y),
      text: pick.t.substring(0, 80),
      candidates: candidates.length,
    };
  }, formatLabel);
  console.log(`row expand ${formatLabel}:`, expanded);
  if (!expanded.ok) {
    await shot(page, `norow-${formatLabel}`);
    return false;
  }
  await sleep(2500);
  await shot(page, `expanded-${formatLabel}`);

  // 3. Click "グループを編集" CTA whose ANCESTOR row begins with the format label
  const groupClicked = await page.evaluate((label) => {
    const ctas = document.querySelectorAll('div[role="button"], a, button');
    let totalLeafs = 0;
    for (const cta of ctas) {
      const raw = cta.innerText || '';
      const t = raw
        .trim()
        .replace(/[​‌‍﻿]/g, '')
        .trim();
      if (t !== 'グループを編集') continue;
      if (cta.offsetHeight === 0) continue;
      totalLeafs += 1;
      let parent = cta.parentElement;
      let depth = 0;
      while (parent && depth < 8) {
        const pt = (parent.innerText || '').trim().replace(/\s+/g, ' ');
        if (pt.startsWith(label) && pt.length < 200) {
          cta.scrollIntoView({ block: 'center' });
          cta.click();
          return {
            ok: true,
            y: Math.round(cta.getBoundingClientRect().y),
            depth,
            parentLen: pt.length,
            parentSnippet: pt.substring(0, 80),
          };
        }
        parent = parent.parentElement;
        depth++;
      }
    }
    return { ok: false, totalLeafs };
  }, formatLabel);
  console.log(`group click ${formatLabel}:`, groupClicked);
  if (!groupClicked.ok) {
    await shot(page, `nogroup-${formatLabel}`);
    return false;
  }
  await sleep(5000);
  await shot(page, `group-${formatLabel}`);

  // 3. In modal: try to find replace media trigger, then upload
  const replaced = await uploadInModal(page, file);
  if (!replaced) {
    await shot(page, `noupload-${formatLabel}`);
    await dumpInteractive(page, `modal-${formatLabel}`);
    return false;
  }
  await sleep(8000);
  await shot(page, `uploaded-${formatLabel}`);

  // 4. Confirm modal — use mouse.click on smallest "保存" leaf (React handler needs trusted gesture).
  // The save button is at bottom-right (modal footer), so prefer rightmost-bottom positions.
  let saved = false;
  for (const t of ['保存', '完了', '適用', '次へ']) {
    const c = await mouseClickByText(page, t, { exact: true, minY: 700 });
    if (c.ok) {
      console.log(`💾 mouse-clicked save: ${t} @ (${c.x},${c.y}) [${c.candidates} cands]`);
      saved = true;
      break;
    }
  }
  if (!saved) {
    // Fallback: any-y match
    for (const t of ['保存', '完了']) {
      const c = await mouseClickByText(page, t, { exact: true });
      if (c.ok) {
        console.log(`💾 fallback mouse-clicked save: ${t} @ (${c.x},${c.y})`);
        saved = true;
        break;
      }
    }
  }
  // Wait for modal to actually close (poll for "配置N件を編集" disappearance)
  const closed = await waitForModalClose(page, 30000);
  console.log(`📭 modal closed: ${closed}`);
  await shot(page, `confirmed-${formatLabel}`);
  if (!closed) {
    // Try one more save attempt if modal still up
    const c2 = await mouseClickByText(page, '保存', { exact: true, minY: 700 });
    if (c2.ok) console.log(`💾 re-save: (${c2.x},${c2.y})`);
    const closed2 = await waitForModalClose(page, 20000);
    console.log(`📭 modal closed after retry: ${closed2}`);
    await shot(page, `confirmed-${formatLabel}-retry`);
    return closed2;
  }
  return true;
}

async function main() {
  cleanupStaleProfile();
  await sleep(1500);
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE,
    args: ['--no-sandbox', '--window-size=1500,1000'],
    defaultViewport: { width: 1500, height: 1000 },
    timeout: 60000,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  try {
    console.log('📍 Opening (preselected)...');
    await page
      .goto(
        `https://adsmanager.facebook.com/adsmanager/manage/ads?act=${ACT}&selected_ad_ids=${AD_ID}`,
        { waitUntil: 'domcontentloaded', timeout: 60000 }
      )
      .catch(() => {});
    await sleep(15000);
    await shot(page, '01-loaded');

    const editToolbar = await clickByText(page, '編集', {
      exact: true,
      minY: 200,
      maxY: 400,
    });
    console.log('toolbar edit:', editToolbar);
    await sleep(12000);
    await shot(page, '02-edit-mode');

    // Scroll to media section
    for (let i = 0; i < 30; i++) {
      await page.evaluate(() => window.scrollBy(0, 100));
      await sleep(150);
    }
    await sleep(2000);
    await shot(page, '03-scrolled');

    // Edit ストーリーズ first (matches selected story-dog banner)
    const okStory = await editGroup(page, 'ストーリーズ', BANNER_STORY);
    console.log('ストーリーズ result:', okStory);

    // Then edit フィード regardless (independent group)
    const okFeed = await editGroup(page, 'フィード', BANNER_FEED);
    console.log('フィード result:', okFeed);

    // Publish only if at least one upload succeeded AND modal is closed
    if (okStory || okFeed) {
      // Make sure no modal is left open
      const stillOpen = await page.evaluate(() => {
        const all = document.querySelectorAll('div, h1, h2, h3, span');
        for (const el of all) {
          const t = (el.innerText || '').trim().split('\n')[0];
          if (/^配置\d+件を編集$/.test(t) && el.offsetHeight > 0) return true;
        }
        return false;
      });
      if (stillOpen) {
        console.log('⚠️ modal still open before publish — aborting publish');
        await shot(page, '99-modal-still-open');
      } else {
        await sleep(2000);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await sleep(2000);
        // Trusted gesture click on 公開する (bottom-right ad-list publish button)
        const pub1 = await mouseClickByText(page, '公開する', { exact: true, minY: 800 });
        console.log('publish click:', pub1);
        await sleep(6000);
        await shot(page, '99-after-publish');
        // Confirmation dialog 公開する
        const pub2 = await mouseClickByText(page, '公開する', { exact: true });
        console.log('publish confirm:', pub2);
        await sleep(8000);
        await shot(page, '99-final');
        // Verify by looking for success toast or "公開済み" indicator
        const verified = await page.evaluate(() => {
          const text = document.body.innerText;
          return /公開されました|公開済み|変更が公開されました|アップロード/.test(text);
        });
        console.log(`🔎 publish verification (text scan): ${verified}`);
        console.log('🎉 DONE');
      }
    } else {
      console.log('⚠️ no uploads succeeded — skipping publish');
      await shot(page, '99-no-publish');
    }
  } catch (e) {
    console.error('❌', e.message);
    await shot(page, 'fatal');
  } finally {
    await sleep(3000);
    await browser.close();
  }
}

main();
