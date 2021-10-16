import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createNew = async ({ title,author,url,token }) => {
  console.log(token)
  try{

    const request = await axios({
      method:'post',
      url:baseUrl,
      data:{
        title:title,
        author:author,
        url:url
      },headers:{
        'Authorization':`bearer ${token}`
      }
    })
    return request.data
  }
  catch( err ){
    return err
  }
}
const likeBlog = async (updatedBlog,id) => {
  try{

    const token = JSON.parse(window.localStorage.getItem('BlogAppSavedUser')).token

    const request = await axios({
      method:'put',
      url:`${baseUrl}/${id}`,
      data:updatedBlog,
      headers:{
        'Authorization':`bearer ${token}`
      }
    })
    return request
  }
  catch(err){
    return err
  }
}
const postComment = async ({ id, comment }) => {
  try{
    const token = JSON.parse(window.localStorage.getItem('BlogAppSavedUser')).token

    const request = await axios({
      method:'post',
      url:`${baseUrl}/${id}/comments`,
      data:{ comment },
      headers:{
        'Authorization':`bearer ${token}`
      }
    })
    return request
  }catch(err){
    return err
  }
}
const deletePost = async (id) => {
  const token = JSON.parse(window.localStorage.getItem('BlogAppSavedUser')).token

  const request = await axios({
    method:'delete',
    url: `${baseUrl}/${id}`,
    headers:{
      'Authorization':`bearer ${token}`
    }
  })
  return request
}

export default { getAll, createNew, likeBlog, deletePost,postComment }