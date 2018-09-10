const Routes = require('next-routes');

const router = Routes()                        
.add('about')              
.add({
    page: 'map-display',
    name: 'map-display', 
    pattern: '/maps/:id' 
})
.add({
    page: 'map-edit',
    name: 'map-edit', 
    pattern: '/maps/:id/edit' 
})

export default router;