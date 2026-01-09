export default function browse() {
    const browse = document.createElement("div");
    browse.classList.add("browse");

    
    browse.appendChild(document.createElement("section"));
    browse.appendChild(document.createElement("h2")).textContent = "Browse";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "Input";
    input.placeholder = "Search for names..";
    input.title = "Type in a name";
    browse.appendChild(input);

    const button = document.createElement("button");
    button.id = "searchButton";
    button.textContent = "Button";
    browse.appendChild(button);


    document.getElementById("searchButton")?.addEventListener("click", () => {
        const input = document.getElementById("Input") as HTMLInputElement;
        console.log("test")
        console.log(input.value);
    });

    return browse;
}