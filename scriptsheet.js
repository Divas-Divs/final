fetch('nav.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navContainer').innerHTML = data;
    });