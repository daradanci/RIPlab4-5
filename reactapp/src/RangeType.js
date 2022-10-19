import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";


class RangeType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            range: [],
            models: [],

        }
        this.rangeId=1;


    }
    componentDidMount(){
        let combo=window.location.pathname.split('/');
        this.rangeId=combo[2]
        const res = fetch("http://127.0.0.1:8000/range/"+this.rangeId)
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    range: result,
                });
                // this.range=result;

            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
        const res2 = fetch("http://127.0.0.1:8000/range/"+this.rangeId+ "/models/")
        .then (res2 => res2.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    models: result,
                });
                // this.models=result;

            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }
    render() {
        const {error, isLoaded, range, models} = this.state;
        return (

            <div>
                <div className={"assortment"}>{range.rangename}</div>

                <div className={"models_list"}>

                {models.map(model=>(
                    <li key={"modelId:"+model.modelid}>
                        <div className={"model_info"}>

                        <div className={"model_name"}>
                             <Link to={`/range/${this.rangeId}/models/${model.modelid}/`}>{model.modelname}</Link>
                        </div>
                        <div className={"producer"}>Производитель: {model.producer}</div>
                        <div className={"price"}>Цена: {model.price} руб.</div>
                        <Link to={`/range/${this.rangeId}/models/${model.modelid}/`}>
                            <img src={"/images/"+model.image} alt={"model_image:"+model.image} width={"200px"} className={"image"}/>
                        </Link>
                        </div>
                    </li>
                ))}
                </div>

            </div>
        );
    }
}

export default RangeType;