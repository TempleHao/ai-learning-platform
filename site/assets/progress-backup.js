// Export/import only the 40 published learning nodes. Files never leave the device.
(() => {
  const ids = count => Array.from({ length: count }, (_, i) => String(i + 1).padStart(2, '0'));
  const keys = [
    ...Array.from({ length: 9 }, (_, i) => String(i).padStart(2, '0'))
      .flatMap(id => ['ai-learning-ch' + id + '-done', 'ai-learning-lab' + id]),
    ...ids(10).map(id => 'ai-learning-chdeep' + id + '-done'),
    ...ids(12).map(id => 'ai-learning-tracklab-' + id)
  ];
  const allowed = new Set(keys);
  const schema = 'ai-learning-progress/v1';
  const exportButton = document.getElementById('exportProgress');
  const importButton = document.getElementById('importProgress');
  const fileInput = document.getElementById('importProgressFile');
  const status = document.getElementById('backupStatus');
  if (!exportButton || !importButton || !fileInput || !status) return;
  const report = message => { status.textContent = message; };
  const completed = () => keys.filter(key => localStorage.getItem(key) === '1');

  exportButton.addEventListener('click', () => {
    try {
      const data = { schema, exportedAt: new Date().toISOString(), completed: completed() };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ai-learning-progress-' + data.exportedAt.slice(0, 10) + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      report('已导出 ' + data.completed.length + ' / 40 个已完成节点。请妥善保存 JSON 文件。');
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
      if (!data || data.schema !== schema || !Array.isArray(data.completed) ||
          data.completed.length > keys.length ||
          data.completed.some(key => typeof key !== 'string' || !allowed.has(key)) ||
          new Set(data.completed).size !== data.completed.length) {
        throw new Error('文件格式、版本或节点内容无效。');
      }
      const selected = new Set(data.completed);
      if (!confirm('恢复后将覆盖本机全部 40 个节点的完成状态（备份中 ' +
          selected.size + ' 个已完成）。确定继续吗？')) {
        report('已取消恢复，原有进度未改变。');
        return;
      }
      const previous = new Map(keys.map(key => [key, localStorage.getItem(key)]));
      try {
        keys.forEach(key => {
          if (selected.has(key)) localStorage.setItem(key, '1');
          else localStorage.removeItem(key);
        });
      } catch {
        previous.forEach((value, key) => {
          try {
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);
          } catch { /* Storage unavailable. */ }
        });
        throw new Error('本机存储写入失败，请检查浏览器隐私设置。');
      }
      window.dispatchEvent(new Event('ai-learning-progress-updated'));
      report('恢复成功：' + selected.size + ' / 40 个节点已完成，Dashboard 已刷新。');
    } catch (error) {
      report('恢复失败：' + (error.message || '无法读取备份文件。'));
    } finally {
      event.target.value = '';
    }
  });
})();
