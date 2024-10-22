const error_template = (error) => /*html*/`
    <div class="alert alert-danger">
        ${error.message}
    </div>
`

export default error_template;