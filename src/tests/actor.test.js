const request=require('supertest')
const app=require('../app')
const Actor=require('../models/Actor')

beforeAll(async()=>{
    return await Actor.bulkCreate([
        {
            firstName:"Luis",
            lastName:"Seña",
            nationality:"Colombiano",
            image:"No_image",
            birthday:"1990-07-21",
        },
        {
            firstName:"Shayra",
            lastName:"Seña",
            nationality:"Colombiana",
            image:"No_image",
            birthday:"2012-10-22"
        },
        {
            firstName:"Shadia",
            lastName:"Sanchez",
            nationality:"Colombiana",
            image:"No_image",
            birthday:"1993-06-09"
        }
    ])
})

const actor= {
        firstName:"Yulis",
        lastName:"Sanchez",
        nationality:"Colombiana",
        image:"No_image",
        birthday:"1994-07-22"
}

let actorId


test('Get=>/api/v1/actors',async () => { 
    const res=await request(app)
        .get("/api/v1/actors")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
})
test('post=>/api/v1/actors',async () => { 
    const res=await request(app)
        .post("/api/v1/actors")
        .send(actor)    
    actorId=res.body.id
    console.log(actorId)
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})
test('put=>/api/v1/actors',async () => { 
    const actUpdate={
        nationality:"Venezolana"
    }
    const res=await request(app)
        .put(`/api/v1/actors/${actorId}`)
        .send(actUpdate)    
    
    expect(res.status).toBe(200)
    expect(res.body.nationality).toBe(actUpdate.nationality)
})

test('delete=>/api/v1/actors',async () => { 
       const res=await request(app)
            .delete(`/api/v1/actors/${actorId}`)

    expect(res.status).toBe(204)
   
})