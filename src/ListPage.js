import React from 'react';
import Post from './Post';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const mockPostData = [
    {
        node:{
            id:"1",
            description:"Howdy Pal",
            imageUrl: 'http://www.cutestpaw.com/wp-content/uploads/2015/09/Howdy-partner.jpeg'
        }
    },
    {
        node:{
            id:"2",
            description:"Ice Cream",
            imageUrl: 'http://www.cutestpaw.com/wp-content/uploads/2012/11/I-think-it-is-safe-to-say-Artoo-loves-ice-cream.jpg'
        }
    }
]

class ListPage extends React.Component {

  render () {
    // console.log('ListPage - render - environment', this.props.relay.environment)
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {mockPostData.map(({node}) =>
            <Post key={node.id} post={node} />
          )}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(ListPage, graphql`
  fragment ListPage_viewer on Viewer {
    allPosts(last: 100, orderBy: createdAt_DESC) @connection(key: "ListPage_allPosts", filters: []) {
      edges {
        node {
          ...Post_post
        }
      }
    }
  }
`);