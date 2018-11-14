import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../actions/posts'
import { getCurrentUser } from '../../actions/users'
import { reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'

class CreatePost extends Component {
    componentDidMount() {
        this.props.getCurrentUser(); // для вызова localStorage.getItem в экшене createPost
        //this.forceUpdate();
    }

    handleFormSubmit = (props) => {
        this.props.createPost(props);
    }

    render() {
        const { handleSubmit } = this.props;

        console.log(this.props);

        return (
            <div className="form-container">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <h5 className="grey-text text-darken-3">Create new post</h5>

                    <Field name="title" component={renderField} type="text" placeholder="title" />
                    <Field name="body" component={renderField} type="text" placeholder="body" />

                    <button type="submit" className="btn pink lighten-1 z-depht-0">Create</button>
                </form>
            </div>
        )
    }
}

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
        <input type={type} placeholder={placeholder} {...input} />
        {touched && error && <div className="form-error">{error}</div>}
    </div>
);

const validate = props => {
    const errors = {};
    const fields = [
        'title',
        'body'
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
        post: state.post // проверить
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        createPost,
        getCurrentUser
    }, dispatch);
}
CreatePost = reduxForm({ form: 'createPost', validate })(CreatePost);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)