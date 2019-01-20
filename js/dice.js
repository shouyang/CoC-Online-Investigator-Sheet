function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function roll_d4()
{
    return getRndInteger(1,4)
}

function roll_d6()
{
    return getRndInteger(1,6)
}

function roll_d8()
{
    return getRndInteger(1,8)
}

function roll_d10()
{
    return getRndInteger(1,10)
}

function roll_d20()
{
    return getRndInteger(1,20)
}

function roll_d12()
{
    return getRndInteger(1,12)
}

function roll_d100()
{
    return getRndInteger(1,100)
}

function roll_investigator_skill(element_id)
{

    var element_skills_pair= element_id.closest(".skills-pair");

    var element_skills_name  = element_skills_pair.getElementsByClassName("skills-header")[0];
    var element_skills_value = element_skills_pair.getElementsByClassName("skills-value")[0];
    var element_roll_result  = element_skills_pair.getElementsByClassName("skills-pair-roll-result")[0];


    var skills_value = try_parse_float(element_skills_value.innerText);
    var roll_value   = roll_d100();

    if (roll_value <= skills_value)
    {
        var fractional_character = "";

        if (roll_value <= skills_value / 2)
        {
            fractional_character = "½";
        }

        if (roll_value <= skills_value / 3 )
        {
            fractional_character = "⅓";
        }

        if (roll_value <= skills_value / 4)
        {
            fractional_character = "¼";
        }

        if (roll_value <= skills_value / 5)
        {
            fractional_character = "⅕";
        }

        element_roll_result.style.color = "green";
        element_roll_result.innerText = `✓ (${roll_value}) ${fractional_character}`;
    }

    else
    {
        element_roll_result.style.color = "red";
        element_roll_result.innerText = `✗ (${roll_value})`;
    }

    element_roll_result.style.display = "inline";

    setTimeout( function() {element_roll_result.style.display = "none"}, 45 * 1000);
}

function roll_investigator_statistic(element_id)
{

    var element_skills_pair= element_id.closest(".statistics-field-pair");

    var element_skills_name  = element_skills_pair.getElementsByClassName("statistics-field-header")[0];
    var element_skills_value = element_skills_pair.getElementsByClassName("statistics-field-value")[0];
    var element_roll_result  = element_skills_pair.getElementsByClassName("statistics-field-tooltip-dice-result")[0];


    var statistic_value = try_parse_float(element_skills_value.innerText);
    var roll_value   = roll_d100();

    if (roll_value <= statistic_value)
    {
        var fractional_character = "";

        if (roll_value <= statistic_value / 2)
        {
            fractional_character = "½";
        }

        if (roll_value <= statistic_value / 3 )
        {
            fractional_character = "⅓";
        }

        if (roll_value <= statistic_value / 4)
        {
            fractional_character = "¼";
        }

        if (roll_value <= statistic_value / 5)
        {
            fractional_character = "⅕";
        }

        element_roll_result.style.color = "lawngreen";
        element_roll_result.innerText = `✓ (${roll_value}) ${fractional_character}`;
    }

    else
    {
        element_roll_result.style.color = "red";
        element_roll_result.innerText = `✗ (${roll_value})`;
    }

    element_roll_result.style.display = "inline";

    setTimeout( function() {element_roll_result.style.display = "none"}, 45 * 1000);
}

function roll_resistance_check(skill_value, opp_value)
{
    var result = Object();

    var threshold = 50 + 5 * skill_value - 5 * opp_value;
    var roll= roll_d100();

    result.check     = (roll <= threshold ? "✓" : "✗");
    result.threshold = threshold;
    result.result    = roll;

    return result;
}

function try_parse_float(text)
{
    var output = parseFloat (text);

    if (isNaN(output))
    {
        alert("This could not be parsed, try the format XX%: " + text);
    }

    return output;
}


// When the user clicks on the button, open the modal
function displayStatisticsResistanceModal(element)
{
    // Get the modal
    var modal = document.getElementById('resistance-modal');

    modal.getElementsByClassName("current_skill") [0].innerHTML = element.closest(".statistics-field-pair").getElementsByClassName("statistics-field-header")[0].innerHTML;
    modal.getElementsByClassName("current_value") [0].innerHTML = element.closest(".statistics-field-pair").getElementsByClassName("statistics-field-value")[0].innerHTML;

    modal.style.display = "block";
}

function displaySkillResistanceModal(element)
{
    // Get the modal
    var modal = document.getElementById('resistance-modal');

    modal.getElementsByClassName("current_skill") [0].innerHTML = element.closest(".skills-pair").getElementsByClassName("skills-header")[0].innerHTML;
    modal.getElementsByClassName("current_value") [0].innerHTML = element.closest(".skills-pair").getElementsByClassName("skills-value")[0].innerHTML;

    modal.style.display = "block"
}

function rollStatisticsResistanceModal()
{
    var modal = document.getElementById('resistance-modal');

    var current_statistic  =  try_parse_float(modal.getElementsByClassName("current_value")[0].innerHTML);
    var opposing_statistic =  try_parse_float(modal.getElementsByClassName("opposing_value")[0].innerHTML);

    var result = roll_resistance_check(current_statistic / 5, opposing_statistic / 5);

    var output_area = modal.getElementsByClassName("resistance-modal-result")[0];
    output_area.innerText  = `${result.check}:threshold= ${result.threshold},roll = ${result.result}`;
    output_area.style.fontWeight = "Bold";


    if (result.check == "✓")
    {
        output_area.style.color = "green";
    }

    else
    {
        output_area.style.color = "red";
    }

        setTimeout( function() {output_area.innerText = ""}, 60 * 1000);
}


// When the user clicks on <span> (x), close the modal
function hideStatisticsResistanceModal() {
    // Get the modal
    var modal = document.getElementById('resistance-modal');

    modal.style.display = "none";
}