// express 모듈 세팅 

const express = require('express')
const app = express()
app.listen(1234)

let youtuber1 = {
    channelTitle : "십오야", 
    subscriber : "593만명", 
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨", 
    subscriber : "227만명", 
    videoNum : "6600개"
}

let youtuber3 = {
    channelTitle : "테오", 
    subscriber : "54.8만명", 
    videoNum : "726개"
}

let db = new Map()     // db에는 number가 들어있다
var id = 1 
db.set(id++, youtuber1)  // 기존 값을 활용하고 +1 해주는 것이기 때문에 처음부터 id++을 해주어야 한다.
db.set(id++, youtuber2)
db.set(id++, youtuber3)


//REST API 설계
//전체 조회 
app.get('/youtubers', function (req,res) {
    res.json(db)
})

//개별 조회 
app.get('/youtuber/:id', function (req, res) {    
    let {id} = req.params
    id = parseInt(id)

const youtuber = db.get(id)
    if(youtuber === undefined) {
        res.json({
            message : "유튜버 정보를 찾을 수 없습니다"
        })
    } else {
    res.json(youtuber)
    }      
  })


  //Youtuber 등록
  app.use(express.json()) // json라는 middleware를 사용하면 req로 오는 값을 json으로 볼 수 있다.
app.post('/youtuber', (req, res) => {
    console.log(req.body)
    //등록 => Map(db)에 저장(put)
    db.set(id++, req.body)
    res.json({
        message : `${db.get(id - 1).channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})