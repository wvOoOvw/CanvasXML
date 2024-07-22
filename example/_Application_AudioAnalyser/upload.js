const upload = (callback) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.addEventListener('change', function(e) {  
        callback(e.target.files)
        input.remove()
    })
    input.click()
}

export {updaet}