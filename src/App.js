import React from "react";
import { Container, Header } from "semantic-ui-react";
import { getBitcoinArticles, getArticles } from './api';
import {ArticleList} from'./components/articles/articlelist';
import SearchBar from "./components/search/search";

class App extends React.Component {
  state = {
    articles: [],
    apiError: "",
  };
  searchForTopic = async (topic) => {
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults,
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {
    try {
      const response = await getBitcoinArticles();
      this.setState({ articles: response.articles });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
  }

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults,
    } = this.state;
    return (
      <Container>
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          Search for a topic
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
      </Container>
    );
  }
}

export default App;