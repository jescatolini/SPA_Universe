export class Router{
  routes = {}

  select(a1, a2, a3){
    a1.classList.add('select')
    a2.classList.remove('select')
    a3.classList.remove('select')
  }

  add(routeName, page){
    this.routes[routeName] = page
  }

  route(event){
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({}, "", event.target.href)

    this.handle()
  }
  
  handle(){
    const { pathname } = window.location
    const route = this.routes[pathname]

    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    const home = document.querySelector('#home')
    const universe = document.querySelector('#universe')
    const explorer = document.querySelector('#explorer')
    
    switch( pathname ){
      case '/':
        this.select(home, universe, explorer)
        break
  
      case '/universe':
        this.select(universe, explorer,home)
        break
  
      case '/exploration':
        this.select(explorer,universe, home)
        break
    }
  }


}