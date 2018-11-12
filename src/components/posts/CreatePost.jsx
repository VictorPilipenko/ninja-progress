import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../actions/posts';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';

class CreatePost extends Component {
    handleFormSubmit = (props) => {
        this.props.createPost(props);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="container">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <h5 className="grey-text text-darken-3">Create new post</h5>
                    <Field name="name" component={renderField} type="text" placeholder="name" />
                    <Field name="title" component={renderField} type="text" placeholder="title" />

                    <button type="submit" className="btn pink lighten-1 z-depht-0">Create</button>

                </form>
            </div>
        )
    }
}

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div>
        <input type={type} placeholder={placeholder} {...input} />
        {touched && error && <div>{error}</div>}
    </div>
);

const validate = props => {
    const errors = {};
    const fields = [
        'name',
        'title',
    ];

    fields.forEach((f) => {
        if (!(f in props)) {
            errors[f] = `required`;
        }
    });

    return errors;
};

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        createPost
    }, dispatch);
}
CreatePost = reduxForm({ form: 'createPost', validate })(CreatePost);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)