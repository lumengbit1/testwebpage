import React, { Component } from 'react';

import './OrganizationPage.css';
import ITree from './Tree';
import ISlide from './Slider'
import {Row,Col} from 'react-bootstrap';
import {Input,Icon} from 'antd';


const pagetext='Welcome Page'


class OrganizationPage extends Component {
    constructor() {
        super();
        this.state={
            treeselect:null,
            page:pagetext,
            buttontext:'Login',
            logtext:'',
            logpassword:'',
        }
    }

    handleTreeselect=(val)=>{
        console.log(val)
        this.setState({treeselect: val},()=>{this.changpage()});
        //   console.log(this.state.treeselect)

    }
    changpage = ()=>{
        if(this.state.treeselect=='001'){
            this.setState({page:'Introduce 1'})
        }else if(this.state.treeselect=='002'){
            this.setState({page:<ISlide/>})
        }
    }
    handleClick=()=>{
        if(this.state.logtext==='username'||this.state.logpassword==='password'){
            alert('Please enter Username and Password!');
            return;
        }
        if(this.state.buttontext==='Login'){
            this.setState({buttontext:'Logout'});
            this.refs.login.style.display='none';
            this.refs.logout.style.display='block';
        }else{
            this.setState({buttontext:'Login',logtext:'',logpassword:''});
            this.refs.login.style.display='block';
            this.refs.logout.style.display='none';
        }
    }

    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ logtext: '' });
    }
    onChangeUserName = (e) => {
        this.setState({logtext:e.target.value})
    }
    passEmpty = () => {
        this.passWordInput.focus();
        this.setState({ logpassword: '' });
    }
    onChangePassword = (e) => {
        this.setState({logpassword:e.target.value})
    }


    render() {

        const { logtext,logpassword } = this.state;
        const suffixuser = logtext ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const suffixpassword = logpassword ? <Icon type="close-circle" onClick={this.passEmpty} /> : null;

        return (

            <div>
                <Row className="content">
                    <Col className='treecol' md={2} >
                        <ITree handleTreeselect={this.handleTreeselect}/>
                    </Col>
                    <Col className='centre' md={8}>
                        {this.state.page}
                    </Col>
                    <Col className='right' md={2}>
                        <br/>
                        <div ref='login'>
                            <div>
                                <Input
                                    ref='user'
                                    placeholder="Enter your username"
                                    prefix={<Icon type="user" />}
                                    suffix={suffixuser}
                                    value={logtext}
                                    onChange={this.onChangeUserName}
                                    ref={node => this.userNameInput = node}
                                    onPressEnter={this.handleClick}
                                />
                            </div>
                            <div>
                                {/*<label htmlFor='password' style={{width:80}}>Password:</label>*/}
                                {/*<input type='password' id='password'  placeholder={this.state.logpassword} onChange={this.handleChangepassword} />*/}
                                <Input
                                    placeholder="Enter your password"
                                    prefix={<Icon type="lock" />}
                                    suffix={suffixpassword}
                                    value={logpassword}
                                    onChange={this.onChangePassword}
                                    ref={node => this.passWordInput = node}
                                    onPressEnter={this.handleClick}
                                />
                            </div>
                        </div>
                        <div ref='logout' style={{display:'none'}}>
                            <h4> Welcome,{this.state.logtext}</h4>
                        </div>
                        <br/>
                        <div align="center">
                            {/*<Button >Login</Button>*/}
                            <input type="button" id="btn1" value={this.state.buttontext} onClick={this.handleClick}/>
                        </div>

                    </Col>
                </Row>
            </div>



        )


    }
}

export default OrganizationPage;
