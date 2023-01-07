const r = fetch('http://localhost:5678/api/works')
.then(r => r.json())
.then(body => console.log(body))