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

module.exports = { getIndexPage, getAboutPage }