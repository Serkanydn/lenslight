const getIndexPage = (req, res) => {
    res.render('index',
        {
            link: 'index'
        }
    )
}

const getAboutPage = (req, res) => {
    res.render('about',
        {
            link: 'about'
        }
    )
}

const getRegisterPage = (req, res) => {
    res.render('register',
        {
            link: 'register'
        }
    )
}

module.exports = { getIndexPage, getAboutPage,getRegisterPage }