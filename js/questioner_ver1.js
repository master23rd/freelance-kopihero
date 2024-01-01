;(function () {
  function buildQuiz() {
    // variable to store the HTML output
    const questions = []

    // for each question...
    //value, index
    myQuestions.forEach((currentSection, sectionNumber) => {
      const output = []

      // and for each available answer...
      //for (questionList in currentSection.questions) {
      currentSection.questions.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = []

        for (letter in currentQuestion.answers) {
          // console.log(letter)
          // console.log(currentSection.questions[questionList].question)
          // ...add an HTML radio button
          answers.push(
            `<label>
                <input type="radio" name="question${sectionNumber}_${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
          )
        }
        // add this question and its answers to the output
        output.push(
          `<div class="question" id="question${sectionNumber}_${questionNumber}"> ${
            currentQuestion.question
          } </div>
          <div class="answers" id="answer${sectionNumber}_${questionNumber}"> ${answers.join(
            ''
          )} </div>`
        )
      })
      questions.push(
        `<h1>${currentSection.section}</h1>
          ${output.join('')}`
      )
    })

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = questions.join('')
  }

  function showResults() {
    // gather answer containers from our quiz
    // const answerContainers = quizContainer.querySelectorAll('.answers')
    // console.log(answerContainers)
    // keep track of user's answers
    let notfilled = false
    const results = []
    const emptyForm = []

    myQuestions.forEach((currentSection, sectionNumber) => {
      let numCorrect = 0

      // for each question...
      currentSection.questions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerSelector = `div[id=answer${sectionNumber}_${questionNumber}]`
        const answerContainer = quizContainer.querySelector(answerSelector)
        const questionSelector = `div[id=question${sectionNumber}_${questionNumber}]`
        const questionContainer = quizContainer.querySelector(questionSelector)

        const selector = `input[name=question${sectionNumber}_${questionNumber}]:checked`
        const userAnswer = (answerContainer.querySelector(selector) || {}).value

        if (typeof userAnswer === 'undefined') {
          notfilled = true
          questionContainer.style.color = 'red'
        } else {
          questionContainer.style.color = 'black'
        }
        // // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++

          // color the answers green
          // answerContainer.style.color = 'lightgreen'
        }
        // // if answer is wrong or blank
        // else {
        //   // color the answers red
        //   answerContainer.style.color = 'red'
        // }
      })

      results[sectionNumber] = numCorrect
      // show number of correct answers out of total
      // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`
    })
    if (notfilled) {
      alert('setiap pertanyaan wajib diisi ya atau tidak')
      return
    }
    renderResult(results)
  }

  function renderResult(results) {
    let renderScore = `<h1>
    Scorecard memilih jurusan kuliah yang tepat, Navigating Your Future
    Workshop Desember 2023
  </h1>
  <!-- <p class="meta">
    <i class="fas fa-user"></i> Posted by <strong> Jane Doe</strong> | 19
    Desember 2023
  </p> -->
  <p>
    Halo, terima kasih telah menaruh minat untuk mengikuti Workshop
    Navigating Your Future, Workshop untuk menentukan jurusan dan kampus.
    Berikut merupakan score card untuk menilai "Seberapa siap kamu untuk
    menentukan jurusan dan kampus yang akan dituju". Terdapat 23
    pertanyaan pilihan ganda (Ya/Tidak) yang terbagi ke dalam 5 (lima)
    aspek yang akan kamu isi di scorecard ini. Aspek tersebut yaitu:
  </p>
  <div class="list">
    <ul class="list-show">
      <li><p>Aspek minat dan bakat</p></li>
      <li><p>Aspek akademik</p></li>
      <li><p>Aspek non-akademik</p></li>
      <li><p>Aspek prospek masa depan</p></li>
      <li><p>Aspek orang tua</p></li>
    </ul>
  </div>
  <p>
    Berdasarkan pengalaman mendampingi calon mahasiswa,
    pertanyaan-pertanyaan ini merupakan pertanyaan yang penting untuk
    dijawab saat kamu menentukan jurusan dan kampus saat nanti kuliah.
  </p>
  <p>
    Sebelumnya, kamu diminta untuk mengisi data diri agar hasil score card
    dapat lebih relevan. Setelah score card ini diisi, kamu akan
    mendapatkan secara langsung hasil score card ini melalui email. Skor
    maksimal adalah 23/23 yang memberikan indikasi bahwa kamu cukup
    memiliki pengetahuan mengenai jurusan/kampus yang hendak dituju.
  </p>
  <p>
    Selain itu, kamu akan mendapatkan tambahan uraian analisa dari hasil
    score card ini melalui WA/email. Setelah itu instruksi pembayaran dan
    workshop akan kamu peroleh.
  </p>
  <p>Terima kasih</p>
  <p>Pak Chris (081288985786), jika ada pertanyaan silahkan WA</p>`

    let renderContact = `<div class="column">
  <div class="column-1">
    <div id="chartContainer"></div>
  </div>
</div>
<div class="column">
  <div class="column-2">
    <h2>Konsultasikan Masa Depan Mu</h2>
    <form action="" class="callback-form">
      <div class="form-control">
        <label for="name">Nama</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="masukan nama"
          class="solid"
        />
      </div>
      <div class="form-control">
        <label for="phone"
          >Nomor WA (opsional) untuk dikirimkan hasil score card yang
          lebih komprehensif (nomor WA dijamin keamanannya)</label
        >
        <input
          type="text"
          name="name"
          id="wa_number"
          placeholder="masukan kontak whatsapp"
          class="solid"
        />
      </div>
      <input
        type="submit"
        value="send"
        id="submit"
        class="btn btn-primary"
      />
    </form>
  </div>
</div>`

    introResult.classList.add('pre-animation')
    contactResult.classList.add('pre-animation')

    // timed to match animation-duration
    setTimeout(function () {
      // questionareContainer.style.display = 'none'
      questionareContainer.classList.add('pre-animation')
      // Smooth Scrolling

      $('html, body').animate(
        {
          scrollTop: $('.hero').offset().top - 100,
        },
        800
      )

      introResult.classList.remove('pre-animation')
      contactResult.classList.remove('pre-animation')
      introResult.innerHTML = renderScore
      contactResult.innerHTML = renderContact
      pieChart(results)
    }, 700)

    //$('#chartContainer').CanvasJSChart(options)
  }

  function pieChart(optResults) {
    const chartScore = document.getElementById('chartContainer')

    chartScore.style.height = '300px'
    chartScore.style.width = '100%'
    console.log(optResults)
    var options = {
      title: {
        text: 'Scorecard Results',
      },
      data: [
        {
          type: 'pie',
          startAngle: 45,
          showInLegend: 'true',
          legendText: '{label}',
          indexLabel: '{label} ({y})',
          yValueFormatString: '#,##0.#' % '',
          dataPoints: [
            { label: 'Minat & Bakat', y: optResults[0] },
            { label: 'Akademis', y: optResults[1] },
          ],
        },
      ],
    }
    //return options
    $('#chartContainer').CanvasJSChart(options)
  }
  const questionareContainer = document.getElementById('questioner')
  const quizContainer = document.getElementById('quiz')
  const resultsContainer = document.getElementById('results')
  const submitButton = document.getElementById('submit')
  const introResult = document.getElementById('scorecard')
  const contactResult = document.getElementById('contact')
  const myQuestions = [
    {
      section: 'Minat & Bakat',
      questions: [
        {
          question: 'Apa Hobi Kamu adalah membaca ?',
          answers: {
            a: 'Ya',
            b: 'Tidak',
          },
          correctAnswer: 'a',
        },
        {
          question: 'Apa Hobi Kamu adalah membaca ?',
          answers: {
            a: 'Ya',
            b: 'Tidak',
          },
          correctAnswer: 'a',
        },
        // {
        //   question: 'Apa Hobi Kamu adalah membaca ?',
        //   answers: {
        //     a: 'Ya',
        //     b: 'Tidak',
        //   },
        //   correctAnswer: 'a',
        // },
        // {
        //   question: 'Apa Hobi Kamu adalah membaca ?',
        //   answers: {
        //     a: 'Ya',
        //     b: 'Tidak',
        //   },
        //   correctAnswer: 'a',
        // },
      ],
    },
    {
      section: 'Akademis',
      questions: [
        {
          question: 'Apa kamu pernah menjadi juara kelas ?',
          answers: {
            a: 'Ya',
            b: 'Tidak',
          },
          correctAnswer: 'a',
        },
        {
          question: 'Apa kamu pernah menjadi juara kelas ?',
          answers: {
            a: 'Ya',
            b: 'Tidak',
          },
          correctAnswer: 'a',
        },
        // {
        //   question: 'Apa kamu pernah menjadi juara kelas ?',
        //   answers: {
        //     a: 'Ya',
        //     b: 'Tidak',
        //   },
        //   correctAnswer: 'a',
        // },
        // {
        //   question: 'Apa kamu pernah menjadi juara kelas ?',
        //   answers: {
        //     a: 'Ya',
        //     b: 'Tidak',
        //   },
        //   correctAnswer: 'a',
        // },
        // {
        //   question: 'Apa kamu pernah menjadi juara kelas ?',
        //   answers: {
        //     a: 'Ya',
        //     b: 'Tidak',
        //   },
        //   correctAnswer: 'a',
        // },
      ],
    },
  ]

  // Kick things off
  buildQuiz()

  //   console.log(quizContainer.innerHTML)

  // Event listeners
  submitButton.addEventListener('click', showResults)
})()
