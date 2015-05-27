function setParentsDetailsForm() {
    $('#parent2name').show();
    $('#parent2dob').show();
    switch (parentsStractureSelected) {
        case 1:
            document.getElementById("parent1name").innerHTML = 'Mothers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Mothers Birthday: <input type="date"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2name").innerHTML = 'Fathers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2dob").innerHTML = 'Fathers Birthday: <input type="date"   class="inputText" style="border:1px solid #000000">';
            break;
        case 2:
            document.getElementById("parent1name").innerHTML = 'Fathers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Fathers Birthday: <input type="date"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2name").innerHTML = 'Fathers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2dob").innerHTML = 'Fathers Birthday: <input type="date"   class="inputText" style="border:1px solid #000000">';
            break;
        case 3:
            document.getElementById("parent1name").innerHTML = 'Mothers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Mothers Birthday: <input type="date"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2name").innerHTML = 'Mothers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2dob").innerHTML = 'Mothers Birthday: <input type="date"   class="inputText" style="border:1px solid #000000">';
            break;
        case 4:
            document.getElementById("parent1name").innerHTML = 'Mothers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Mothers Birthday: <input type="date"  class="inputText" style="border:1px solid #000000">';
            $('#parent2name').hide();
            $('#parent2dob').hide();
            break;
        case 5:
            document.getElementById("parent1name").innerHTML = 'Fathers name: <input type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Fathers Birthday: <input type="date"  class="inputText" style="border:1px solid #000000">';
            $('#parent2name').hide();
            $('#parent2dob').hide();
            break;
    }
}
