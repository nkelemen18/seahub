import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { seafileAPI } from '../../utils/seafile-api.js';

const propTypes = {
  itemName: PropTypes.string.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  repoID: PropTypes.string.isRequired,
};

class LibHistorySetting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keepDays: -1,
      expireDays: 30,
      disabled: true,
      allHistory: true,
      noHistory: false,
      autoHistory: false,
      errorInfo: ''
    };
  }

  componentDidMount() {
    seafileAPI.getRepoHistoryLimit(this.props.repoID).then(res => {
      this.setState({
        keepDays: res.data.keep_days,
        allHistory: res.data.keep_days < 0 ? true : false,
        noHistory: res.data.keep_days === 0 ? true : false,
        autoHistory: res.data.keep_days > 0 ? true : false,
        disabled: res.data.keep_days > 0 ? false : true,
        expireDays: res.data.keep_days > 0 ? res.data.keep_days : 30, 
      });
    });
  }

  submit = () => {
    let days = this.state.keepDays;
    let repoID = this.props.repoID;
    let reg = /^-?\d+$/;
    let flag = reg.test(days);
    if (flag) {  
      seafileAPI.setRepoHistoryLimit(repoID, days).then(res => {
        this.setState({
          keepDays: res.data.keep_days
        });
      });
      this.props.toggleDialog();
    } else {
      this.setState({
        errorInfo: gettext('Please enter a non-negative integer'),
      })
    }
  }

  onChange = (e) => {
    let num = e.target.value;
    this.setState({
      keepDays: num,
      expireDays: num,
    });
  }

  setLimitDays = (type) => {
    if (type === 'allHistory') {
      this.setState({
        keepDays: -1,
      });
    } else if (type === 'noHistory') {
      this.setState({
        keepDays: 0,
      });
    } else {
      this.setState({
        disabled: false 
      });
    }

    this.setState({
      allHistory: type === 'allHistory' ? true : false,
      noHistory: type === 'noHistory' ? true : false,
      autoHistory: type === 'autoHistory' ? true : false,
    });
  }

  render() {
    const itemName = this.props.itemName;
    return (
      <Modal isOpen={true} centered={true}>
        <ModalHeader toggle={this.props.toggleDialog}>
        <span className="sf-font" title={itemName}>{itemName}</span>{' '}{gettext('History Setting')}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" checked={this.state.allHistory} onChange={() => {this.setLimitDays('allHistory')}}/>{' '}{gettext('Keep full history')}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" checked={this.state.noHistory} onChange={() =>{this.setLimitDays('noHistory')}}/>{' '}{gettext('Don\'t keep history')}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" checked={this.state.autoHistory} onChange={() =>{this.setLimitDays('autoHistory')}}/>{' '}{gettext('Only keep a period of history:')}
                <Input className="expire-input" type="text" 
                       value={this.state.expireDays}
                       onChange={this.onChange} 
                       disabled={this.state.disabled}
                       /> 
                <span>{gettext('days')}</span>
              </Label>
            </FormGroup>
            <Label className="err-message">{this.state.errorInfo}</Label>
            <br />
            <Button onClick={this.submit}>{gettext('Submit')}</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

LibHistorySetting.propTypes = propTypes;

export default LibHistorySetting;
