$(function() {
  let numOfSubjects = 1;
  let dirty = false;

  const naughtyList = [
    341289,
    311126,
    304303,
    340493,
    237561,
    374217,
    233131,
    344480,
    194923
  ];

  function getCompleteForm(
    username,
    id,
    draw1,
    draw2,
    draw3,
    draw4,
    rec1,
    rec2,
    rec3,
    rec4,
    tier,
    backupSanta,
    freeInfo,
    //referer,
    subjects
  ) {
    let result = `[b]Username:[/b] ${username}
[b]ID:[/b] ${id}
[b]Please rank your -drawing- preferences:[/b]
[LIST=1]
[*] ${draw1}
[*] ${draw2}
[*] ${draw3}
[*] [s]${draw4}[/s]
[/LIST]
[b]Please rank your -receiving- preferences:[/b]
[LIST=1]
[*] ${rec1}
[*] ${rec2}
[*] ${rec3}
[*] [s]${rec4}[/s]
[/LIST]
[b]What tier would you like to be in?[/b] ${tier}
[b]Would you like to sign up as a Backup Santa?[/b] ${backupSanta}
[b]Any additional information for your Secret Santa:[/b]
${freeInfo}`;

    //result += referer === "" ? "" : "\n[b]Referred by:[/b] " + referer;

    for (let i = 0; i < subjects.length; i++) {
      result += `

[center]•••••[/center]

[b]Subject Name:[/b] ${subjects[i].name}
[b]Reference pictures/links:[/b] `;
      if (subjects[i].link.endsWith("png") || subjects[i].link.endsWith("jpg"))
        result += `\n[img]${subjects[i].link}[/img]`;
      else result += subjects[i].link;
      result += `\n[b]I would like to receive this type of art for this subject:[/b] ${subjects[i].types}
[b]Any additional notes for this subject:[/b] ${subjects[i].info}`;
    }

    return result;
  }

  window.onbeforeunload = function() {
    if (dirty)
      return "Are you sure? You have not finished your form yet and leaving will lose your progress. If you mean to go back, use the red back button.";
  };

  $("#completeForm").bind({
    copy: function() {
      dirty = false;
      $("#exitBtn").prop('disabled', false);
    }
  });

  //$("[rel=tooltip]").tooltip();
  $("#addSubjectBtn").tooltip("disable");

  // Hide all sections
  $("#userAndPassForm").toggle();
  $("#drawPrefRankForm").toggle();
  $("#recPrefRankForm").toggle();
  $("#tierForm").toggle();
  $("#backupSantaForm").toggle();
  $("#freeForm").toggle();
  $("#subjectsForm").toggle();
  $("#referForm").toggle();
  $("#completedForm").toggle();

  // Close
  $(".close").click(function() {
    $(".modal").modal("hide");
  });

  // Nav buttons
  $("#startBtn").click(function() {
    scrollTo(0, 0);
    $("#welcome").toggle();
    $("#userAndPassForm").toggle();
  });

  $("#submitUserAndPassForm").click(function() {
    if (naughtyList.includes(parseInt($("#userId").val(), 10))) {
      $("#naughtyModal").modal("show");
    } else {
      scrollTo(0, 0);
      $("#userAndPassForm").toggle();
      $("#drawPrefRankForm").toggle();
      dirty = true;
    }
  });

  $("#returnToUserAndId").click(function() {
    scrollTo(0, 0);
    $("#userAndPassForm").toggle();
    $("#drawPrefRankForm").toggle();
  });

  $(".toggleDrawPrefForm").click(function() {
    scrollTo(0, 0);
    $("#drawPrefRankForm").toggle();
    $("#recPrefRankForm").toggle();
  });

  $(".toggleRecPrefForm").click(function() {
    scrollTo(0, 0);
    $("#recPrefRankForm").toggle();
    $("#tierForm").toggle();
  });

  $(".toggleTierForm").click(function() {
    scrollTo(0, 0);
    $("#tierForm").toggle();
    $("#backupSantaForm").toggle();
  });

  $(".toggleBackupSantaForm").click(function() {
    scrollTo(0, 0);
    $("#backupSantaForm").toggle();
    $("#freeForm").toggle();
  });

  $(".toggleFreeForm").click(function() {
    scrollTo(0, 0);
    $("#freeForm").toggle();
    $("#subjectsForm").toggle();
  });

  // $(".toggleReferForm").click(function() {
  //   scrollTo(0, 0);
  //   $("#referForm").toggle();
  //   $("#subjectsForm").toggle();
  // });

  $(".toggleSubjectsForm").click(function() {
    let subjects = [];

    for (let i = 1; i <= numOfSubjects; i++) {
      if (
        $(`#subjectName${i}`).val() === "" &&
        $(`#subjectImg${i}`).val() === "" &&
        getTypes(i) === "" &&
        $(`#subjectFree${i}`).val() === ""
      )
        continue;

      subjects.push({
        name: $(`#subjectName${i}`).val(),
        link: $(`#subjectImg${i}`).val(),
        types: getTypes(i),
        info: $(`#subjectFree${i}`).val()
      });
    }

   // if (subjects.length < 1) {
     // $(".toggleSubjectsForm").tooltip("enable");
   // } else {
      $(".toggleSubjectsForm").tooltip("disable");
      $("textarea#completeForm").val(
        getCompleteForm(
          $("#username").val(),
          $("#userId").val(),
          $("#drawHighPref").val(),
          $("#drawMedPref").val(),
          $("#drawLowPref").val(),
          $("#drawNoAllow").val(),
          $("#recHighPref").val(),
          $("#recMedPref").val(),
          $("#recLowPref").val(),
          $("#recNoAllow").val(),
          $("input[name='chosenTier']:checked").val(),
          $("#backupSantaCheckbox").is(":checked") ? "Yes" : "No",
          $("#freeInfo").val(),
          //$("#referer").val(),
          subjects
        )
      );

      scrollTo(0, 0);
      $("#subjectsForm").toggle();
      $("#completedForm").toggle();
   // }
  });

  // Buttons
  $("#addSubjectBtn").click(function() {
    if (numOfSubjects >= 5) return;

    numOfSubjects++;

    $(`<hr>
        <div id="subjectForm${numOfSubjects}">
        <div class="form-group container-fluid" style="max-width: 970px;">
            <h5>Subject ${numOfSubjects}</h5>
            <label for="subjectName${numOfSubjects}">Subject Name:</label
            ><input
              type="text"
              id="subjectName${numOfSubjects}"
              name="subjectName${numOfSubjects}"
              class="form-control"
              placeholder="Subject Name"
            />
          </div>
          <div class="form-group container-fluid" style="max-width: 970px;">
            <label for="subjectImg${numOfSubjects}">Subject Reference Image:</label
            ><input
              type="url"
              id="subjectImg${numOfSubjects}"
              name="subjectImg${numOfSubjects}"
              class="form-control"
              placeholder="Link to image"
            />
          </div>
          <br />
          <!-- OPTIONS -->
          <h5>
            What type of art would you like for this character?
          </h5>
          <p>
            Choose all types of art that apply to this subject.
            <strong
              >This is only used as a guideline for your Santa to determine how
              to draw your subject.</strong
            >
            For example, if I wanted an anthro version or just a feral drawing
            of my FR dragon, I could check "FR Dragon" and
            "Anthropomorphic/Furry".
          </p>
          <div class="row">
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="frDragCB${numOfSubjects}"
                />
                <label class="form-check-label" for="frDragCB${numOfSubjects}"
                  >FR Dragon
                  <a data-toggle="modal" href="#dragInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="feralOcCB${numOfSubjects}"
                />
                <label class="form-check-label" for="feralOcCB${numOfSubjects}"
                  >Feral OC
                  <a data-toggle="modal" href="#nonDragInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gijPreDesCB${numOfSubjects}"
                />
                <label class="form-check-label" for="gijPreDesCB${numOfSubjects}"
                  >FR Gijinka - Predesigned/Visual Reference
                  <a data-toggle="modal" href="#gijPreInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gijWritCB${numOfSubjects}"
                />
                <label class="form-check-label" for="gijWritCB${numOfSubjects}"
                  >FR Gijinka - Written Description
                  <a data-toggle="modal" href="#gijWriInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gijNoDesCB${numOfSubjects}"
                />
                <label class="form-check-label" for="gijNoDesCB${numOfSubjects}"
                  >FR Gijinka - No Description
                  <a data-toggle="modal" href="#gijNoDInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="humOC${numOfSubjects}" />
                <label class="form-check-label" for="humOC${numOfSubjects}"
                  >Human OC
                  <a data-toggle="modal" href="#humanInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="anthroCB${numOfSubjects}"
                />
                <label class="form-check-label" for="anthroCB${numOfSubjects}"
                  >Anthropomorphic/Furry
                  <a data-toggle="modal" href="#anthroInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
            <div class="container justify-content-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="otherHumCB${numOfSubjects}"
                />
                <label class="form-check-label" for="otherHumCB${numOfSubjects}"
                  >Other Humanoid OC
                  <a data-toggle="modal" href="#otherHumInfo" class="button"
                    >(?)</a
                  ></label
                >
              </div>
            </div>
          </div>
          <!-- End options -->
          <br />
          <div class="container-fluid" style="max-width: 970px;">
            <div class="md-form">
              <label for="freeInfo"
                >Any additional notes for this subject</label
              >
              <textarea
                id="subjectFree${numOfSubjects}"
                class="md-textarea form-control"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div class="container-fluid" style="max-width: 970px;">
            <p align="center">
              <small>
                Note: BBCode is not supported here, so you'll have to add that
                when you post to the forums!
              </small>
            </p>
          </div>
        </div>`).insertAfter($(`#subjectForm${numOfSubjects - 1}`));

    if (numOfSubjects >= 5) {
      $("#addSubjectBtn").prop("disabled", true);
      $("#addSubjectBtn").tooltip("enable");
    }
  });

  $("#copyBtn").click(function() {
    /* Get the text field */
    let copyText = document.getElementById("completeForm");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert(
      "And that's it - you've copied your completed sign-up form! Head to the forums to paste and post to finish signing up :D"
    );

    dirty = false;

    // TODO replace alert with tooltip
    /*
    $('[data-toggle="tooltip"]').tooltip({
      trigger : 'hover'
    })    
    */
  });

  function getTypes(i) {
    let types = [];

    if ($(`#frDragCB${i}`).is(":checked")) types.push("FR Dragon");
    if ($(`#feralOcCB${i}`).is(":checked")) types.push("Feral OC");
    if ($(`#gijPreDesCB${i}`).is(":checked"))
      types.push("FR Gijinka - Predesigned/Visual Reference");
    if ($(`#gijWritCB${i}`).is(":checked"))
      types.push("FR Gijinka - Written Description");
    if ($(`#gijNoDesCB${i}`).is(":checked"))
      types.push("FR Gijinka - No Description");
    if ($(`#humOC${i}`).is(":checked")) types.push("Human OC");
    if ($(`#anthroCB${i}`).is(":checked")) types.push("Anthropomorphic/Furry");
    if ($(`#otherHumCB${i}`).is(":checked")) types.push("Other Humanoid OC");

    return types.join(", ");
  }
});
