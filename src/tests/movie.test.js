const request=require('supertest')
const app=require('../app')
const Movie=require('../models/Movie')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require("../models")

beforeAll(async()=>{
    return await Movie.bulkCreate([
        {
           name:"Probando el entregable 1",
           image:"no_image",
           synopsis:"Esta peli es de comedia jajaja",
           releaseYear:"2012"
        },
        {
            name:"Probando el entregable 2",
            image:"no_image",
            synopsis:"Esta peli no es peli",
            releaseYear:"1993"
        },
        {
            name:"Probando el entregable 3",
            image:"no_image",
            synopsis:"Una mas",
            releaseYear:"1991"
        },
        {
            name:"Probando el entregable 4",
            image:"no_image",
            synopsis:"Una mas y otra mas",
            releaseYear:"1990"
        }           
    ])
})

const movie=  {
    name:"Esta para el post",
    image:"no_image",
    synopsis:"Erase una ves haciendo un entregable",
    releaseYear:"2023"
} 

let movieId


test('Get=>/api/v1/movies',async () => { 
    const res=await request(app)
        .get("/api/v1/movies")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(4)
})
test('post=>/api/v1/movies',async () => { 
    const res=await request(app)
        .post("/api/v1/movies")
        .send(movie)    
    movieId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
})
test('put=>/api/v1/movies',async () => { 
    const movieUpdate= {
        name:"Actualizando peli",
        synopsis:"Update peli",
        releaseYear:"2023"
    } 
    const res=await request(app)
        .put(`/api/v1/movies/${movieId}`)
        .send(movieUpdate)    
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movieUpdate.name)
})


test("POST -> 'movies/:id/actors', should return status code 200 and res.body.length === 1", async () => {
    const actor= {
        firstName:"Yulis",
        lastName:"Sanchez",
        nationality:"Colombiana",
        image:"No_image",
        birthday:"1994-07-22"
    }
    const createActor = await Actor.create(actor)
    const res = await request(app)
       .post(`/api/v1/movies/${movieId}/actors`)
       .send([createActor.id])
   
     console.log(res.body);
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
     expect(res.body[0].id).toBe(createActor.id)    
    await createActor.destroy()
  
})

test("POST -> 'movies/:id/Directors', should return status code 200 and res.body.length === 1", async () => {
    const director= {
        firstName:"Luis",
        lastName:"Seña",
        nationality:"Colombiano",
        image:"No_image",
        birthday:"1990-07-22"
    }
    const createDirector = await Director.create(director)
    const res = await request(app)
       .post(`/api/v1/movies/${movieId}/directors`)
       .send([createDirector.id])
   
     console.log(res.body);
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
     expect(res.body[0].id).toBe(createDirector.id)    
    await createDirector.destroy()
  
})

test("POST -> 'movies/:id/actors', should return status code 200 and res.body.length === 1", async () => {
    const genre= {
        name:"Comedy"
    }
    const createActor = await Genre.create(genre)
    const res = await request(app)
       .post(`/api/v1/movies/${movieId}/genres`)
       .send([createActor.id])
   
     console.log(res.body);
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
     expect(res.body[0].id).toBe(createActor.id)    
    await createActor.destroy()
  
  })

test('delete=>/api/v1/movies',async () => { 
    const res=await request(app)
         .delete(`/api/v1/movies/${movieId}`)

 expect(res.status).toBe(204)

})
