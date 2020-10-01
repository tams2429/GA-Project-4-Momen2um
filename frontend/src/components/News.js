import React from 'react'

import { getWorldNews } from '../lib/api'
import { Popover } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import PerfectScrollbar from 'react-perfect-scrollbar'

class News extends React.Component {
  state = {
    news: null
  }

  async componentDidMount() {
    const news = await getWorldNews()
    this.setState( { news: news.data.articles } )
  }

  render() {
    if (!this.state.news) return null
    return (
      <Popover placement="leftTop" title={'News'}
        content={
          <div className="news">
            <PerfectScrollbar>
              {this.state.news.map((item, index) => {
                return (
                  <div key={index} className="newsArticle">
                    <h2 className="newsArticleTitle">{item.title}</h2>
                    <h3 className="newsArticleDate">{item.publishedAt.slice(0,10)}</h3>
                    <p className="newsArticleDescription">{item.description}</p>
                    <img className="newsArticleImage" alt="news article image" src={item.image}></img>
                    <p className="newsArticleLink">Link to article:
                      <a href={item.url}>{item.url}</a>
                    </p>
                    <hr/>
                  </ div>
                )
              })}
            </PerfectScrollbar>
          </div>
        } trigger="click">
        <ReadOutlined style={ { fontSize: '32px' } }/>
      </Popover>
    )
  }
}

export default News
