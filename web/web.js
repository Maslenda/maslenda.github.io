/**
 * @author Leviathenn(aka Levi G. Anderson)
 */


    if(!localStorage.getItem('font')){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const query = urlParams.get('q');
        if(!query){
            //Were all good
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Uh Oh!',
                text: 'Looks like you may have typed your password wrong. You get 4 tries before your account is disabled!',
            })
        }
    }else{
        if(localStorage.getItem('font-t')){
            document.location.href = "/app/teach";
        }else{
            document.location.href = "/app";
        }

    }


