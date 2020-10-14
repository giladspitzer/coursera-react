import React, { Component } from 'react';
import Menu from './menuComponent'
import Contact from './contactComponent'
import About from './aboutComponent'
import DishDetail from './dishDetailComponent'
import Header from './headerComponent'
import Footer from './footerComponent'
import Home from './homeComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect} from 'react-redux'
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/actionCreators'
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => { dispatch(fetchLeaders())},
  postFeedback: (values) => dispatch(postFeedback(values)),

})

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}/>
        )
    }

    const DishWithId = ({match}) => {
        return(
            <DishDetail 
              dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
            />
        )
    }

    const MenuPage = () => {
      return(
        <Menu dishes={this.props.dishes}/>
      )
    }

    const AboutPage = () => {
      return(
        <About 
          leaders={this.props.leaders}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
          />
      )
    }
    
    const ContactPage = () => {
      return(
        <Contact 
          resetFeedbackForm={this.props.resetFeedbackForm} 
          postFeedback={this.props.postFeedback}
        />
      )
    }

    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage}/>
              <Route exact path="/menu" component={MenuPage}/>
              <Route path="/menu/:dishId" component={DishWithId}/>
              <Route exact path="/aboutus" component={AboutPage}/>
              <Route exact path='/contactus' component={ContactPage} />
              <Redirect to="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
