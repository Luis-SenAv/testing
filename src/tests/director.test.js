const request=require('supertest')
const app=require('../app')
const Director=require('../models/Director')

beforeAll(async()=>{
    return await Director.bulkCreate([
        {
            firstName:"Nataly",
            lastName:"Witman",
            nationality:"Colombiano",
            image:"No_image",
            birthday:"1990-07-21",
        }       
    ])
})

const director= {
    firstName:"Mateo",
    lastName:"Saenz",
    nationality:"Colombiana",
    image:"No_image",
    birthday:"1994-07-22"
}

let directorId


test('Get=>/api/v1/directors',async () => { 
    const res=await request(app)
        .get("/api/v1/directors")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})
test('post=>/api/v1/directors',async () => { 
    const res=await request(app)
        .post("/api/v1/directors")
        .send(director)    
    directorId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})
test('put=>/api/v1/directors',async () => { 
    const directorUpdate={
        nationality:"American"
    }
    const res=await request(app)
        .put(`/api/v1/directors/${directorId}`)
        .send(directorUpdate)    
    
    expect(res.status).toBe(200)
    expect(res.body.nationality).toBe(directorUpdate.nationality)
})

test('delete=>/api/v1/actors',async () => { 
       const res=await request(app)
            .delete(`/api/v1/directors/${directorId}`)

    expect(res.status).toBe(204)
   
})