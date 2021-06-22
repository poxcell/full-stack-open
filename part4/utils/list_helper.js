const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => {
  let sum = 0

  blogs.forEach(post => sum += post.likes)
  return sum
}

const favoriteBlog = (blogs) =>{
  const mostLiked ={
    title:'',
    author:'',
    likes:0
  }

  blogs.forEach(blog =>{
    if(blog.likes > mostLiked.likes){
      mostLiked.title = blog.title,
      mostLiked.author = blog.author,
      mostLiked.likes = blog.likes
    }
    
  })

  return mostLiked
}

const mostBlogs = blogs => {
  let authorList =[]

  blogs.forEach(blog => {
    
    if(_.has(authorList, blog.author)){
      authorList[blog.author] += 1
      
    } else {
      
      authorList[blog.author] = 1
    }

  })

  let biggestCount ={
    author: '',
    blogs:0
  }
  
  
  for (const key in authorList  ) {
    if (authorList[key] > biggestCount.blogs){
      biggestCount.author = key
      biggestCount.blogs = authorList[key]
    }
  }

  return biggestCount
}

const mostLikes = (blogs) => {
  let authorList ={}

  blogs.forEach(blog => {
    if(_.has(authorList, blog.author)){
      authorList[blog.author] += blog.likes
    } else { 
      authorList[blog.author] = blog.likes
    }
  })

  let currMostLikes = {
    author: '',
    likes: 0
  }

  for (const key in authorList  ) {
    if (authorList[key] > currMostLikes.likes){
      currMostLikes.author = key
      currMostLikes.likes = authorList[key]
    }
  }


  return currMostLikes
}

module.exports ={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}