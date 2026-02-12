const { Blog } = require('../models')

module.exports = {

  // GET /blogs
  async index (req, res) {
    try {
      const blogs = await Blog.findAll()
      res.send(blogs)
    } catch (err) {
      res.status(500).send({
        error: 'Cannot fetch blogs'
      })
    }
  },

  // GET /blog/:blogId
  async show (req, res) {
    try {
      const blog = await Blog.findByPk(req.params.blogId)
      if (!blog) {
        return res.status(404).send({
          error: 'Blog not found'
        })
      }
      res.send(blog)
    } catch (err) {
      res.status(500).send({
        error: 'Cannot fetch blog'
      })
    }
  },

  // POST /blog
  async create (req, res) {
    try {
      const blog = await Blog.create(req.body)
      res.send(blog)
    } catch (err) {
      res.status(500).send({
        error: 'Cannot create blog'
      })
    }
  },

  // PUT /blog/:blogId
  async put (req, res) {
    try {
      const blog = await Blog.findByPk(req.params.blogId)

      if (!blog) {
        return res.status(404).send({
          error: 'Blog not found'
        })
      }

      await blog.update(req.body)
      res.send(blog)
    } catch (err) {
      res.status(500).send({
        error: 'Cannot update blog'
      })
    }
  },

  // DELETE /blog/:blogId
  async remove (req, res) {
    try {
      const blog = await Blog.findByPk(req.params.blogId)

      if (!blog) {
        return res.status(404).send({
          error: 'Blog not found'
        })
      }

      await blog.destroy()
      res.send({
        message: 'Blog deleted successfully'
      })
    } catch (err) {
      res.status(500).send({
        error: 'Cannot delete blog'
      })
    }
  }

}
