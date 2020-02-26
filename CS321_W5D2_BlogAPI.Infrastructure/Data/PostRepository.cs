using System;
using System.Collections.Generic;
using System.Linq;
using CS321_W5D2_BlogAPI.Core.Models;
using CS321_W5D2_BlogAPI.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace CS321_W5D2_BlogAPI.Infrastructure.Data
{
    public class PostRepository : IPostRepository

    {
        private readonly AppDbContext _dbContext;
        public PostRepository(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public Post Get(int id)
        {
            // TODO: Implement Get(id). Include related Blog
            return _dbContext.Posts.Include(x => x.Blog)
                .ThenInclude(y => y.User)
                .FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Post> GetBlogPosts(int blogId)
        {
            // TODO: Implement GetBlogPosts, return all posts for given blog id
            return _dbContext.Posts.Include(p => p.Blog)
                .ThenInclude(b => b.User)
                .Where(p => p.BlogId == blogId);
            // TODO: Include related Blog and AppUser
            throw new NotImplementedException();
        }

        public Post Add(Post Post)
        {
            // TODO: add Post
            _dbContext.Posts.Add(Post);
            _dbContext.SaveChanges();
            return Post;
        }

        public Post Update(Post updatedPost)
        {
            // TODO: update Post
            var currentPost = this.Get(updatedPost.Id);
            if (currentPost == null) return null;

            _dbContext.Entry(currentPost).CurrentValues
                .SetValues(updatedPost);
            return currentPost;

        }

        public IEnumerable<Post> GetAll()
        {
            // TODO: get all posts
            return _dbContext.Posts.Include(p => p.Blog);
        }

        public void Remove(int id)
        {
            // TODO: remove Post
            var currentPost = this.Get(id);
            if (currentPost != null)
            {
                _dbContext.Posts.Remove(currentPost);
                _dbContext.SaveChanges();
            }
        }

    }
}
