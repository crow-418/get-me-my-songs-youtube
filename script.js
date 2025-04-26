(() => {
  const buttons = document.querySelectorAll('ytmusic-playlist-shelf-renderer #play-button');

  const list = Array.from(buttons).map(button => {
    const label = button.getAttribute('aria-label') || '';
    // regexes to remove "Play " and anything after " - " followed by a number/digit and a time keyword
    return label.replace(/^Play\s*/, '').replace(/ - \d+ (hours|minutes?|seconds?).*/, '');
  });

  const filename = prompt('Enter the name for the song list file (without extension):');
  if (filename === null) return;

  // Default to song_list.txt if filename is empty
  const fileNameWithExtension = filename.trim() ? `${filename.trim()}.txt` : 'song_list.txt';

  const blob = new Blob([list.join('\n')], { type: 'text/plain' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileNameWithExtension;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
})();
