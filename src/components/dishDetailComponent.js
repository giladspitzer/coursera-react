import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb,
Modal, ModalBody, ModalHeader, Label, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors} from 'react-redux-form'
import { Loading } from './loadingComponent';
import { baseUrl } from '../shared/baseUrl'



const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props)

    this.state = {
        name: this.props.dish,
        isCommentModalOpen: false
    }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
    }
    
    toggleModal(){
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        })
    }

    render(){
        return(
<div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment ({this.state.name})
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" 
                                    name="rating" 
                                    id="rating"
                                    className="form-control"
                                    >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your Name</Label>
                            <Col md={12}>
                                    <Control.text model=".name" 
                                        id="name" 
                                        name="name" 
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), 
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={
                                            {
                                                minLength: "Must be greater than 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }
                                        }
                                    />
                                </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="9" className="form-control"
                                    />
                                </Col>
                            </Row>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        )
    }
}

function RenderDish({dish}){
        return(
            <Card>
                <CardImg width="100%" src={ baseUrl + dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

function RenderDishComments({comments}){
    if (comments != null){
        const comments_formatted = comments.map((comment) => {
            return(
                <li className="m-2" key={comment.id}>
                    {comment.comment}<br/>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </li>
                
            )
        });
        return(
            <ul className="list-unstyled">
                    {comments_formatted}
            </ul>
        )
    }else{
        return(
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    console.log('DishDetail Component render is invoked')
    const dish= props.dish
    const comments = props.comments
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return(
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3><hr/>
                </div>
                <div className="row"  key={dish.id}>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderDishComments comments={comments}/>
                        <CommentForm dish={dish.name} dishId={props.dish.id} postComment={props.postComment}/>
                    </div>
                </div>
            </div>
            
        )
    }else{
        return(
            <div></div>
        )
    }
}
    

export default DishDetail
