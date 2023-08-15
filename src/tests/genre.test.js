const request=require('supertest')
const app=require('../app')
const Genre=require('../models/Genre')

beforeAll(async()=>{
    return await Genre.bulkCreate([
        {
           name:"comedy"
        },
        {
           name:"action"
        }          
    ])
})

const genre= {
   name:"fintion"
}

let genreId


test('Get=>/api/v1/genres',async () => { 
    const res=await request(app)
        .get("/api/v1/genres")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
})
test('post=>/api/v1/genres',async () => { 
    const res=await request(app)
        .post("/api/v1/genres")
        .send(genre)    
    genreId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genre.name)
})
test('put=>/api/v1/genres',async () => { 
    const genreUpdate={
        name:"terror"
    }
    const res=await request(app)
        .put(`/api/v1/genres/${genreId}`)
        .send(genreUpdate)    
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genreUpdate.name)
})

test('delete=>/api/v1/genres',async () => { 
       const res=await request(app)
            .delete(`/api/v1/genres/${genreId}`)

    expect(res.status).toBe(204)
   
})