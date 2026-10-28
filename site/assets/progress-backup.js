// Local-only backup: 40 completion nodes plus one optional reading bookmark.
// v1 files (completion-only) remain importable; v2 exports include the bookmark.
(() => {
  const ids = count => Array.from({ length: count }, (_, i) => String(i + 1).padStart(2, '0'));
  const keys = [
    ...Array.from({ length: 9 }, (_, i) => String(i).padStart(2, '0'))
      .flatMap(id => ['ai-learning-ch' + id + '-done', 'ai-learning-lab' + id]),
    ...ids(10).map(id => 'ai-learning-chdeep' + id + '-done'),
    ...ids(12).map(id => 'ai-learning-tracklab-' + id)
  ];
  const allowed = new Set(keys);
  const schema = 'ai-learning-progress/v2';
  const legacySchema = 'ai-learning-progress/v1';
  const readingKey = 'ai-learning-last-read-v1';
  const coreSlugs = [
    '00-world-map', '01-history-routes', '02-how-models-learn',
    '03-capabilities-applications', '04-application-expert',
    '05-business-future', '06-risk-governance',
    '07-future-scenarios', '08-risk-governance'
  ];
  const deepSlugs = [
    '01-neural-transformer', '02-route-wars-winters', '03-ai-profit-pools',
    '04-agent-economy', '05-ai-native-organization', '06-ai-coding',
    '07-knowledge-systems', '08-multimodal-realtime',
    '09-inference-economics', '10-ai-science-physical'
  ];
  const allowedPaths = new Set([
    ...coreSlugs.map(slug => 'chapters/' + slug + '.html'),
    ...deepSlugs.map(slug => 'deep-dives/' + slug + '.html')
  ]);
  const validReading = item => item !== null && typeof item === 'object' && !Array.isArray(item) &&
    Object.keys(item).length === 3 &&
    Object.keys(item).every(key => ['path', 'section', 'at'].includes(key)) &&
    allowedPaths.has(item.path) &&
    typeof item.section === 'string' && /^[a-z][a-z0-9-]{0,48}$/.test(item.section) &&
    typeof item.at === 'number' && Number.isFinite(item.at) &&
    item.at >= 0 && item.at <= Date.now() + 86400000;
  const normalizeReading = item => validReading(item)
    ? { path: item.path, section: item.section, at: item.at }
    : null;
  const exportButton = document.getElementById('exportProgress');
  const importButton = document.getElementById('importProgress');
  const fileInput = document.getElementById('importProgressFile');
  const status = document.getElementById('backupStatus');
  if (!exportButton || !importButton || !fileInput || !status) return;
  const report = message => { status.textContent = message; };
  const completed = () => keys.filter(key => localStorage.getItem(key) === '1');

  exportButton.addEventListener('click', () => {
    try {
      const raw = localStorage.getItem(readingKey);
      let reading = null;
      if (raw !== null) {
        try { reading = normalizeReading(JSON.parse(raw)); }
        catch { /* Invalid old bookmark is not included in backups. */ }
      }
      const data = { schema, exportedAt: new Date().toISOString(), completed: completed(), reading };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ai-learning-progress-' + data.exportedAt.slice(0, 10) + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      report('已导出 ' + data.completed.length + ' / 40 个已完成节点' +
        (reading ? '及上次阅读小节。' : '（当前无有效阅读书签）。') + '请保存 JSON 文件。');
    } catch (error) {
      report('导出失败：浏览器无法读取或下载本地进度。' + (error.message || ''));
    }
  });

  importButton.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async event => {
    const file = event.target.files && event.target.files[0];
    try {
      if (!file) return;
      if (file.size > 100000) throw new Error('文件超过 100 KB 上限。');
      const data = JSON.parse(await file.text());
      const v1 = data?.schema === legacySchema;
      const v2 = data?.schema === schema;
      if ((!v1 && !v2) || !Array.isArray(data.completed) ||
          data.completed.length > keys.length ||
          data.completed.some(key => typeof key !== 'string' || !allowed.has(key)) ||
          new Set(data.completed).size !== data.completed.length ||
          (v2 && (!Object.prototype.hasOwnProperty.call(data, 'reading') ||
            (data.reading !== null && !validReading(data.reading))))) {
        throw new Error('文件格式、版本、节点或阅读书签无效。');
      }
      // v1 did not contain a bookmark. Clearing the current bookmark avoids a
      // misleading "continue" link after replacing all completion states.
      const reading = v2 ? normalizeReading(data.reading) : null;
      const selected = new Set(data.completed);
      const detail = reading ? '，并恢复上次阅读小节' : '，并清除当前阅读书签';
      if (!confirm('恢复后将覆盖本机全部 40 个节点的完成状态（备份中 ' +
          selected.size + ' 个已完成）' + detail + '。确定继续吗？')) {
        report('已取消恢复，原有进度与阅读书签未改变。');
        return;
      }
      const snapshot = new Map([...keys, readingKey].map(key => [key, localStorage.getItem(key)]));
      try {
        keys.forEach(key => {
          if (selected.has(key)) localStorage.setItem(key, '1');
          else localStorage.removeItem(key);
        });
        if (reading) localStorage.setItem(readingKey, JSON.stringify(reading));
        else localStorage.removeItem(readingKey);
      } catch {
        snapshot.forEach((value, key) => {
          try {
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);
          } catch { /* Storage unavailable. */ }
        });
        throw new Error('本机存储写入失败，请检查浏览器隐私设置。');
      }
      window.dispatchEvent(new Event('ai-learning-progress-updated'));
      report('恢复成功：' + selected.size + ' / 40 个节点已完成' +
        (reading ? '，阅读书签已恢复。' : '，阅读书签已清除。') + 'Dashboard 已刷新。');
    } catch (error) {
      report('恢复失败：' + (error.message || '无法读取备份文件。'));
    } finally {
      event.target.value = '';
    }
  });
})();
