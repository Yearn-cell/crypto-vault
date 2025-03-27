const encrypt = async () => {
  if (!file.value) return;
  
  loading.value = true;
  error.value = '';
  result.value = null;
  
  try {
    const buffer = await Enc.fileToArrayBuffer(file.value);
    
    const encrypted = await Enc.encrypt(buffer, key.value, alg.value);
    
    const blob = new Blob([encrypted]);
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.value.name}.enc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    success.value = `文件 ${file.value.name} 已加密，点击下载链接获取加密文件`;
  } catch (err) {
    console.error(err);
    error.value = `加密失败: ${err instanceof Error ? err.message : String(err)}`;
  } finally {
    loading.value = false;
  }
}; 