import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

function RenderDish({dish}){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

function RenderDishComments({dish}){
    if (dish['comments'] != null){
        const comments = dish['comments'].map((comment) => {
            return(
                <li className="m-2" key={comment.id}>
                    {comment.comment}<br/>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </li>
                
            )
        });
        return(
            <ul className="list-unstyled">
                    {comments}
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
        if (dish != null){
            return(
                <div className="container">
                    <div className="row"  key={dish.id}>
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderDishComments dish={dish}/>
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
