const router = require('koa-router')()
const bigpipe = require('koa-bigpipe')
const pug = require('pug');
const fs = require('fs');

const sleep = ms => new Promise(r => setTimeout(r, ms))

function layout() {
  let options = {
    filename: 'pug',
    basedir: process.cwd() + "/views",
    title: "This is Koa bigpipe Demo"
  }
  let file = process.cwd() + "/views/index.pug"

  // Render the function
  let html =  pug.renderFile(file, options);
  
  return html;
}

function pagelet1() {
  let payload = {
    domid: "pagelet1",
    html: `<h1>this is pagelet1</h1>`
  }
  return `<script charset=\"utf-8\">bigview.view(${JSON.stringify(payload)})</script>`
}

function pagelet2() {
  let payload = {
    domid: "pagelet2",
    html: `<h1>this is pagelet2</h1>`
  }
  return `<script charset=\"utf-8\">bigview.view(${JSON.stringify(payload)})</script>`
}

router.get('/', bigpipe, async (ctx, next) => {
  let html = layout()
  
  ctx.write(html)

  return sleep(2000).then(function(){
    let a = pagelet1()
    ctx.write(a)
    return sleep(5000)
  }).then(function(){
    let b = pagelet2()
    ctx.write(b)
  }).then(function(){
    ctx.end()
  })
})

module.exports = router
