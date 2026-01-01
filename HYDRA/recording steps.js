  const ext = await import('https://www.fentonia.com/hydra-extensions/vertex-webgpu/index.js')
  await ext.replaceHydra()

  fetch('https://raw.githubusercontent.com/jamiefaye/hyground/main/public/InActs/hyperspace.js')
    .then(r => r.text())
    .then(code => eval(code))