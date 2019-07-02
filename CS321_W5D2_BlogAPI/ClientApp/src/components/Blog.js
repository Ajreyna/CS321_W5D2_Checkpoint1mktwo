﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../apiUtils';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import { ApiInfo } from './ApiInfo';

const PostCard = (props) => {
  const post = props.post;
  return (
    <Card>
      <CardBody>
        <CardTitle>{post.title}</CardTitle>
        <CardSubtitle>{post.datePublished.substring(0, 10)}</CardSubtitle>
        {/* <CardText style={{ overflow: 'hidden', textOverflow: 'ellipsis', height: 50 }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }}/>
          </CardText> */}
        <Button tag={Link} to={`/blog/${post.blogId}/post/${post.id}`}>
          Read More...
        </Button>
      </CardBody>
      <CardBody
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', height: 50 }}
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </CardBody>
    </Card>
  );
};

export class Blog extends Component {
  static displayName = Blog.name;

  state = {
    blog: {},
    posts: [],
    apiInfo: {}
  };

  componentDidMount() {
    const { blogId } = this.props.match.params;
    apiCall(`/api/blogs/${blogId}`, {
      method: 'GET',
    }).then((res) => {
      this.setState({
        blog: res.data,
      });
    });
    apiCall(`/api/blogs/${blogId}/posts`).then((res) => {
      this.setState({
        posts: res.data,
        apiInfo: res
      });
    });
  }

  render() {
    const { blog, posts, apiInfo } = this.state;
    return (
      <React.Fragment>
        <h1>{blog.name}</h1>
        {posts.map((p, i) => (
          <PostCard post={p} key={i} />
        ))}
        <ApiInfo apiInfo={apiInfo}/>
      </React.Fragment>
    );
  }
}
