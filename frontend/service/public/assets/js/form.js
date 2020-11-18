// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')
        var correct = true

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                    correct = correct && false
                }

                form.classList.add('was-validated')
            }, false)

            if (correct === true) {
                let age = $('#age').val();
                let gender = $("input[name='gender']:checked").val();
                let region = $('#region').val();

                let intubated = 2
                let patient_type = 1
                var hypertension
                var pneumonia
                var asthma
                var copd
                var immunosuppression
                var smoke
                var pregnancy
                var cardiovascular
                var renal_chronic
                var obesity
                var diabetes
                var other_disease
                var covid_contact
                var icu = 2

                if ($("#hypertension").is(':checked'))
                    hypertension = 97;
                else
                    hypertension = 2;

                if ($("#pneumonia").is(':checked'))
                    pneumonia = 97;
                else
                    pneumonia = 2;

                if ($("#asthma").is(':checked'))
                    asthma = 97;
                else
                    asthma = 2;

                if ($("#copd").is(':checked'))
                    copd = 97;
                else
                    copd = 2;

                if ($("#immunosuppression").is(':checked'))
                    immunosuppression = 97;
                else
                    immunosuppression = 2;

                if ($("#smoke").is(':checked'))
                    smoke = 97;
                else
                    smoke = 2;

                if ($("#pregnancy").is(':checked'))
                    pregnancy = 97;
                else
                    pregnancy = 2;

                if ($("#cardiovascular").is(':checked'))
                    cardiovascular = 97;
                else
                    cardiovascular = 2;

                if ($("#renal-chronic").is(':checked'))
                    renal_chronic = 97;
                else
                    renal_chronic = 2;

                if ($("#obesity").is(':checked'))
                    obesity = 97;
                else
                    obesity = 2;

                if ($("#diabetes").is(':checked'))
                    diabetes = 97;
                else
                    diabetes = 2;

                if ($("#other-disease").is(':checked'))
                    other_disease = 97;
                else
                    other_disease = 2;

                if ($("#covid-contact").is(':checked'))
                    covid_contact = 97;
                else
                    covid_contact = 2;

                // let json = {
                //     "sex": gender,
                //     "patient_type": patient_type,
                //     "intubed": intubated,
                //     "pneumonia": pneumonia,
                //     "age": age,
                //     "pregnancy": pregnancy,
                //     "diabetes": diabetes,
                //     "copd": copd,
                //     "asthma": asthma,
                //     "inmsupr": immunosuppression,
                //     "hypertension": hypertension,
                //     "other_disease": other_disease,
                //     "cardiovascular": cardiovascular,
                //     "obesity": obesity,
                //     "renal_chronic": renal_chronic,
                //     "tobacco": smoke,
                //     "contact_other_covid": covid_contact,
                //     "covid_res": 1,
                //     "icu": icu
                // };

                // var xhttp = new XMLHttpRequest();
                // xhttp.open("POST", "https://eu-gb.functions.appdomain.cloud/api/v1/web/pablo.gimeno@urv.cat_dev/NHackation2020/inferencer_death",
                //     true);
                // xhttp.setRequestHeader("Content-type", "application/json");
                // xhttp.send(JSON.stringify(json));
            }
        })
    }, false)
})()

