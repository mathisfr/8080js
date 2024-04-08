var disassembler;
const reader = new FileReader();
var files;
var file;
var fileBuffer;
var fileBufferView;
window.addEventListener('DOMContentLoaded', function() {
    disassembler = document.getElementById("disassembler");
    const dragfile = this.document.getElementById("drag-file");
    dragfile.addEventListener("dragover", (e)=>{
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    })
    dragfile.addEventListener("drop", (e)=>{
        e.stopPropagation();
        e.preventDefault();
        files = e.dataTransfer.files;
        file = files[0];
        console.log(files);
        const nameSize = file.name.length;
        appendLog("----");
        appendLog("Name: " + (file.name ? file.name : "NOT SUPPORTED"));
        appendLog("Size: " + (file.size ? file.size + " bytes" : "NOT SUPPORTED"));
        readImage();
    })
});

function appendLog(message){
    if (message == undefined) return;
    if (disassembler == undefined) return;
    const logNode = document.createElement("p");
    logNode.appendChild(document.createTextNode(message));
    disassembler.appendChild(logNode);
}

function readImage() {
    reader.readAsArrayBuffer(file);
    reader.addEventListener('loadstart', (event) => {
        appendLog("Loading file...");
    });
    reader.addEventListener('load', (event) => {
        appendLog("Loading successful");
        appendLog("----");
        fileBuffer = reader.result;
        //readBuffer();
        disassemblerBuffer();
    });
    reader.addEventListener('error', (event) => {
        appendLog("Loading failed");
        appendLog(reader.error);
        appendLog("----");
    });
}

function readBuffer(){
    if (fileBufferView == undefined){
        fileBufferView = new Uint8Array(fileBuffer);
    }
    var bytes;
    for (let i = 0; i < fileBufferView.length; i++){
        if (i % 16 == 0){
            appendLog(bytes);
            bytes = "";
        }
        bytes+="0x" + fileBufferView[i].toString(16) + "\t";
    }
    if (bytes !== ""){
        appendLog(bytes);
    }
}

function toHexa(nbr){
    return "0x" + nbr.toString(16) + " ";
}

function disassemblerBuffer(){
    if (fileBufferView == undefined){
        fileBufferView = new Uint8Array(fileBuffer);
    }
    for (let i = 0; i < fileBufferView.length; i++){
        switch(fileBufferView[i]){
            case 0x08:
            case 0x10:
            case 0x18:
            case 0xd9:
            case 0xdd:
            case 0xed:
            case 0xfc:
            case 0xcb:
            case 0xfd:
                break;
            case 0x00:
                appendLog( i.toString(16) + " | " + "NOP");
                break;
            case 0x01:
                appendLog( i.toString(16) + " | " + "LXI B, D16");
                i+=2;
                break;
            case 0x02:
                appendLog( i.toString(16) + " | " + "STAX B");
                break;
            case 0x03:
                appendLog( i.toString(16) + " | " + "INX B");
                break;
            case 0x04:
                appendLog( i.toString(16) + " | " + "INR B");
                break;
            case 0x05:
                appendLog( i.toString(16) + " | " + "DCR B");
                break;
            case 0x06:
                appendLog( i.toString(16) + " | " + "MVI B, D8");
                i++;
                break;
            case 0x07:
                appendLog( i.toString(16) + " | " + "RLC");
                break;
            case 0x09:
                appendLog( i.toString(16) + " | " + "DAD B");
                break;
            case 0x0a:
                appendLog( i.toString(16) + " | " + "LDAX B");
                break;
            case 0x0b:
                appendLog( i.toString(16) + " | " + "DCX B");
                break;
            case 0x0c:
                appendLog( i.toString(16) + " | " + "INR C");
                break;
            case 0x0d:
                appendLog( i.toString(16) + " | " + "DCR C");
                break;
            case 0x0e:
                appendLog( i.toString(16) + " | " + "MVI C, D8");
                i++;
                break;
            case 0x0f:
                appendLog( i.toString(16) + " | " + "RRC");
                break;
            case 0x11:
                appendLog( i.toString(16) + " | " + "LXI D, D16");
                i+= 2;
                break;
            case 0x12:
                appendLog( i.toString(16) + " | " + "STAX D");
                break;
            case 0x13:
                appendLog( i.toString(16) + " | " + "INX D");
                break;
            case 0x14:
                appendLog( i.toString(16) + " | " + "INR D");
                break;
            case 0x15:
                appendLog( i.toString(16) + " | " + "DCR D");
                break;
            case 0x16:
                appendLog( i.toString(16) + " | " + "MVI D, D8");
                i++;
                break;
            case 0x17:
                appendLog( i.toString(16) + " | " + "RAL");
                break;
            case 0x19:
                appendLog( i.toString(16) + " | " + "DAD D");
                break;
            case 0x1a:
                appendLog( i.toString(16) + " | " + "LDAX D");
                break;
            case 0x1b:
                appendLog( i.toString(16) + " | " + "DCX D");
                break;
            case 0x1c:
                appendLog( i.toString(16) + " | " + "INR E");
                break;
            case 0x1d:
                appendLog( i.toString(16) + " | " + "DCR E");
                break;
            case 0x1e:
                appendLog( i.toString(16) + " | " + "MVI E, D8");
                i++;
                break;
            case 0x1f:
                appendLog( i.toString(16) + " | " + "RAR");
                break;
            case 0x20:
                appendLog( i.toString(16) + " | " + "RIM");
                break;
            case 0x21:
                appendLog( i.toString(16) + " | " + "LXI H, D16");
                i+= 2;
                break;
            case 0x22:
                appendLog( i.toString(16) + " | " + "SHLD " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0x23:
                appendLog( i.toString(16) + " | " + "INX H");
                break;
            case 0x24:
                appendLog( i.toString(16) + " | " + "INR H");
                break;
            case 0x25:
                appendLog( i.toString(16) + " | " + "DCR H");
                break;
            case 0x26:
                appendLog( i.toString(16) + " | " + "MVI H, D8");
                i++;
                break;
            case 0x27:
                appendLog( i.toString(16) + " | " + "DAA");
                break;
            case 0x29:
                appendLog( i.toString(16) + " | " + "DAD H");
                break;
            case 0x2a:
                appendLog( i.toString(16) + " | " + "LHLD " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0x2b:
                appendLog( i.toString(16) + " | " + "DCX H");
                break;
            case 0x2c:
                appendLog( i.toString(16) + " | " + "INR L");
                break;
            case 0x2d:
                appendLog( i.toString(16) + " | " + "DCR L");
                break;
            case 0x2e:
                appendLog( i.toString(16) + " | " + "MVI L, D8");
                i++;
                break;
            case 0x2f:
                appendLog( i.toString(16) + " | " + "CMA");
                break;
            case 0x31:
                appendLog( i.toString(16) + " | " + "LXI SP, D16");
                i+= 2;
                break;
            case 0x32:
                appendLog( i.toString(16) + " | " + "STA " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0x33:
                appendLog( i.toString(16) + " | " + "INX SP");
                break;
            case 0x34:
                appendLog( i.toString(16) + " | " + "INR M");
                break;
            case 0x35:
                appendLog( i.toString(16) + " | " + "DCR M");
                break;
            case 0x36:
                appendLog( i.toString(16) + " | " + "MVI M,D8");
                i++;
                break;
            case 0x37:
                appendLog( i.toString(16) + " | " + "STC");
                break;
            case 0x39:
                appendLog( i.toString(16) + " | " + "DAD SP");
                break;
            case 0x3a:
                appendLog( i.toString(16) + " | " + "LDA " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0x3b:
                appendLog( i.toString(16) + " | " + "DCX SP");
                break;
            case 0x3c:
                appendLog( i.toString(16) + " | " + "INR A");
                break;
            case 0x3d:
                appendLog( i.toString(16) + " | " + "DCR A");
                break;
            case 0x3e:
                appendLog( i.toString(16) + " | " + "MVI A,D8");
                i++;
                break;
            case 0x3f:
                appendLog( i.toString(16) + " | " + "CMC");
                break;
            case 0x40:
                appendLog( i.toString(16) + " | " + "MOV B, B");
                break; 
            case 0x41: 
                appendLog( i.toString(16) + " | " + "MOV B, C");
                break; 
            case 0x42: 
                appendLog( i.toString(16) + " | " + "MOV B, D");
                break; 
            case 0x43: 
                appendLog( i.toString(16) + " | " + "MOV B, E");
                break; 
            case 0x44: 
                appendLog( i.toString(16) + " | " + "MOV B, H");
                break; 
            case 0x45: 
                appendLog( i.toString(16) + " | " + "MOV B, L");
                break; 
            case 0x46: 
                appendLog( i.toString(16) + " | " + "MOV B, M");
                break; 
            case 0x47: 
                appendLog( i.toString(16) + " | " + "MOV B, A");
                break; 
            case 0x48: 
                appendLog( i.toString(16) + " | " + "MOV C, B");
                break; 
            case 0x49: 
                appendLog( i.toString(16) + " | " + "MOV C, C");
                break; 
            case 0x4a: 
                appendLog( i.toString(16) + " | " + "MOV C, D");
                break; 
            case 0x4b: 
                appendLog( i.toString(16) + " | " + "MOV C, E");
                break; 
            case 0x4c: 
                appendLog( i.toString(16) + " | " + "MOV C, H");
                break; 
            case 0x4d: 
                appendLog( i.toString(16) + " | " + "MOV C, L");
                break; 
            case 0x4e: 
                appendLog( i.toString(16) + " | " + "MOV C, M");
                break; 
            case 0x4f: 
                appendLog( i.toString(16) + " | " + "MOV C, A");
                break; 
            case 0x50: 
                appendLog( i.toString(16) + " | " + "MOV D, B");
                break; 
            case 0x51: 
                appendLog( i.toString(16) + " | " + "MOV D, C");
                break;
            case 0x52: 
                appendLog( i.toString(16) + " | " + "MOV D, D");
                break;
            case 0x53: 
                appendLog( i.toString(16) + " | " + "MOV D, E");
                break;
            case 0x54: 
                appendLog( i.toString(16) + " | " + "MOV D, H");
                break;
            case 0x55: 
                appendLog( i.toString(16) + " | " + "MOV D, L");
                break;
            case 0x56:
                appendLog( i.toString(16) + " | " + "MOV D, M");
                break;
            case 0x57:
                appendLog( i.toString(16) + " | " + "MOV D, A");
                break;
            case 0x58:
                appendLog( i.toString(16) + " | " + "MOV E, B");
                break;
            case 0x59:
                appendLog( i.toString(16) + " | " + "MOV E, C");
                break;
            case 0x5a:
                appendLog( i.toString(16) + " | " + "MOV E, D");
                break;
            case 0x5b:
                appendLog( i.toString(16) + " | " + "MOV E, E");
                break;
            case 0x5c:
                appendLog( i.toString(16) + " | " + "MOV E, H");
                break;
            case 0x5d:
                appendLog( i.toString(16) + " | " + "MOV E, L");
                break;
            case 0x5e:
                appendLog( i.toString(16) + " | " + "MOV E, M");
                break;
            case 0x5f:
                appendLog( i.toString(16) + " | " + "MOV E, A");
                break;
            case 0x60:
                appendLog( i.toString(16) + " | " + "MOV H, B");
                break;
            case 0x61:
                appendLog( i.toString(16) + " | " + "MOV H, C");
                break;
            case 0x62:
                appendLog( i.toString(16) + " | " + "MOV H, D");
                break;
            case 0x63:
                appendLog( i.toString(16) + " | " + "MOV H, E");
                break;
            case 0x64:
                appendLog( i.toString(16) + " | " + "MOV H, H");
                break;
            case 0x65:
                appendLog( i.toString(16) + " | " + "MOV H, L");
                break;
            case 0x66:
                appendLog( i.toString(16) + " | " + "MOV H, M");
                break;
            case 0x67:
                appendLog( i.toString(16) + " | " + "MOV H, A");
                break;
            case 0x68:
                appendLog( i.toString(16) + " | " + "MOV L, B");
                break;
            case 0x69:
                appendLog( i.toString(16) + " | " + "MOV L, C");
                break;
            case 0x6a:
                appendLog( i.toString(16) + " | " + "MOV L, D");
                break;
            case 0x6b:
                appendLog( i.toString(16) + " | " + "MOV L, E");
                break;
            case 0x6c:
                appendLog( i.toString(16) + " | " + "MOV L, H");
                break;
            case 0x6d:
                appendLog( i.toString(16) + " | " + "MOV L, L");
                break;
            case 0x6e:
                appendLog( i.toString(16) + " | " + "MOV L, M");
                break;
            case 0x6f:
                appendLog( i.toString(16) + " | " + "MOV L, A");
                break;
            case 0x70:
                appendLog( i.toString(16) + " | " + "MOV M, B");
                break;
            case 0x71:
                appendLog( i.toString(16) + " | " + "MOV M, C");
                break;
            case 0x72:
                appendLog( i.toString(16) + " | " + "MOV M, D");
                break;
            case 0x73:
                appendLog( i.toString(16) + " | " + "MOV M, E");
                break;
            case 0x74:
                appendLog( i.toString(16) + " | " + "MOV M, H");
                break;
            case 0x75:
                appendLog( i.toString(16) + " | " + "MOV M, L");
                break;
            case 0x76:
                appendLog( i.toString(16) + " | " + "HLT");
                break;
            case 0x77:
                appendLog( i.toString(16) + " | " + "MOV M, A");
                break;
            case 0x78:
                appendLog( i.toString(16) + " | " + "MOV A, B");
                break;
            case 0x79:
                appendLog( i.toString(16) + " | " + "MOV A, C");
                break;
            case 0x7a:
                appendLog( i.toString(16) + " | " + "MOV A, D");
                break;
            case 0x7b:
                appendLog( i.toString(16) + " | " + "MOV A, E");
                break;
            case 0x7c:
                appendLog( i.toString(16) + " | " + "MOV A, H");
                break;
            case 0x7d:
                appendLog( i.toString(16) + " | " + "MOV A, L");
                break;
            case 0x7e:
                appendLog( i.toString(16) + " | " + "MOV A, M");
                break;
            case 0x7f:
                appendLog( i.toString(16) + " | " + "MOV A, A");
                break;
            case 0x80:
                appendLog( i.toString(16) + " | " + "ADD B");
                break;
            case 0x81:
                appendLog( i.toString(16) + " | " + "ADD C");
                break;
            case 0x82:
                appendLog( i.toString(16) + " | " + "ADD D");
                break;
            case 0x83:
                appendLog( i.toString(16) + " | " + "ADD E");
                break;
            case 0x84:
                appendLog( i.toString(16) + " | " + "ADD H");
                break;
            case 0x85:
                appendLog( i.toString(16) + " | " + "ADD L");
                break;
            case 0x86:
                appendLog( i.toString(16) + " | " + "ADD M");
                break;
            case 0x87:
                appendLog( i.toString(16) + " | " + "ADD A");
                break;
            case 0x88:
                appendLog( i.toString(16) + " | " + "ADC B");
                break;
            case 0x89:
                appendLog( i.toString(16) + " | " + "ADC C");
                break;
            case 0x8a:
                appendLog( i.toString(16) + " | " + "ADC D");
                break;
            case 0x8b:
                appendLog( i.toString(16) + " | " + "ADC E");
                break;
            case 0x8c:
                appendLog( i.toString(16) + " | " + "ADC H");
                break;
            case 0x8d:
                appendLog( i.toString(16) + " | " + "ADC L");
                break;
            case 0x8e:
                appendLog( i.toString(16) + " | " + "ADC M");
                break;
            case 0x8f:
                appendLog( i.toString(16) + " | " + "ADC A");
                break;
            case 0x90:
                appendLog( i.toString(16) + " | " + "SUB B");
                break;
            case 0x91:
                appendLog( i.toString(16) + " | " + "SUB C");
                break;
            case 0x92:
                appendLog( i.toString(16) + " | " + "SUB D");
                break;
            case 0x93:
                appendLog( i.toString(16) + " | " + "SUB E");
                break;
            case 0x94:
                appendLog( i.toString(16) + " | " + "SUB H");
                break;
            case 0x95:
                appendLog( i.toString(16) + " | " + "SUB L");
                break;
            case 0x96:
                appendLog( i.toString(16) + " | " + "SUB M");
                break;
            case 0x97:
                appendLog( i.toString(16) + " | " + "SUB A");
                break;
            case 0x98:
                appendLog( i.toString(16) + " | " + "SBB B");
                break;
            case 0x99:
                appendLog( i.toString(16) + " | " + "SBB C");
                break;
            case 0x9a:
                appendLog( i.toString(16) + " | " + "SBB D");
                break;
            case 0x9b:
                appendLog( i.toString(16) + " | " + "SBB E");
                break;
            case 0x9c:
                appendLog( i.toString(16) + " | " + "SBB H");
                break;
            case 0x9d:
                appendLog( i.toString(16) + " | " + "SBB L");
                break;
            case 0x9e:
                appendLog( i.toString(16) + " | " + "SBB M");
                break;
            case 0x9f:
                appendLog( i.toString(16) + " | " + "SBB A");
                break;
            case 0xa0:
                appendLog( i.toString(16) + " | " + "ANA B");
                break;
            case 0xa1:
                appendLog( i.toString(16) + " | " + "ANA C");
                break;
            case 0xa2:
                appendLog( i.toString(16) + " | " + "ANA D");
                break;
            case 0xa3:
                appendLog( i.toString(16) + " | " + "ANA E");
                break;
            case 0xa4:
                appendLog( i.toString(16) + " | " + "ANA H");
                break;
            case 0xa5:
                appendLog( i.toString(16) + " | " + "ANA L");
                break;
            case 0xa6:
                appendLog( i.toString(16) + " | " + "ANA M");
                break;
            case 0xa7:
                appendLog( i.toString(16) + " | " + "ANA A");
                break;
            case 0xa8:
                appendLog( i.toString(16) + " | " + "XRA B");
                break;
            case 0xa9:
                appendLog( i.toString(16) + " | " + "XRA C");
                break;
            case 0xaa:
                appendLog( i.toString(16) + " | " + "XRA D");
                break;
            case 0xab:
                appendLog( i.toString(16) + " | " + "XRA E");
                break;
            case 0xac:
                appendLog( i.toString(16) + " | " + "XRA H");
                break;
            case 0xad:
                appendLog( i.toString(16) + " | " + "XRA L");
                break;
            case 0xae:
                appendLog( i.toString(16) + " | " + "XRA M");
                break;
            case 0xaf:
                appendLog( i.toString(16) + " | " + "XRA A");
                break;
            case 0xb0:
                appendLog( i.toString(16) + " | " + "ORA B");
                break;
            case 0xb1:
                appendLog( i.toString(16) + " | " + "ORA C");
                break;
            case 0xb2:
                appendLog( i.toString(16) + " | " + "ORA D");
                break;
            case 0xb3:
                appendLog( i.toString(16) + " | " + "ORA E");
                break;
            case 0xb4:
                appendLog( i.toString(16) + " | " + "ORA H");
                break;
            case 0xb5:
                appendLog( i.toString(16) + " | " + "ORA L");
                break;
            case 0xb6:
                appendLog( i.toString(16) + " | " + "ORA M");
                break;
            case 0xb7:
                appendLog( i.toString(16) + " | " + "ORA A");
                break;
            case 0xb8:
                appendLog( i.toString(16) + " | " + "CMP B");
                break;
            case 0xb9:
                appendLog( i.toString(16) + " | " + "CMP C");
                break;
            case 0xba:
                appendLog( i.toString(16) + " | " + "CMP D");
                break;
            case 0xbb:
                appendLog( i.toString(16) + " | " + "CMP E");
                break;
            case 0xbc:
                appendLog( i.toString(16) + " | " + "CMP H");
                break;
            case 0xbd:
                appendLog( i.toString(16) + " | " + "CMP L");
                break;
            case 0xbe:
                appendLog( i.toString(16) + " | " + "CMP M");
                break;
            case 0xbf:
                appendLog( i.toString(16) + " | " + "CMP A");
                break;
            case 0xc0:
                appendLog( i.toString(16) + " | " + "RNZ");
                break;
            case 0xc1:
                appendLog( i.toString(16) + " | " + "POP B");
                break;
            case 0xc2:
                appendLog( i.toString(16) + " | " + "JNZ " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xc3:
                appendLog( i.toString(16) + " | " + "JMP " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xc4:
                appendLog( i.toString(16) + " | " + "CNZ " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xc5:
                appendLog( i.toString(16) + " | " + "PUSH B");
                break;
            case 0xc6:
                appendLog( i.toString(16) + " | " + "ADI D8");
                i++;
                break;
            case 0xc7:
                appendLog( i.toString(16) + " | " + "RST 0");
                break;
            case 0xc8:
                appendLog( i.toString(16) + " | " + "RZ");
                break;
            case 0xc9:
                appendLog( i.toString(16) + " | " + "RET");
                break;
            case 0xca:
                appendLog( i.toString(16) + " | " + "JZ " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xcc:
                appendLog( i.toString(16) + " | " + "CZ " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xcd:
                appendLog( i.toString(16) + " | " + "CALL " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xce:
                appendLog( i.toString(16) + " | " + "ACI D8");
                i++;
                break;
            case 0xcf:
                appendLog( i.toString(16) + " | " + "RST 1");
                break;
            case 0xd0:
                appendLog( i.toString(16) + " | " + "RNC");
                break;
            case 0xd1:
                appendLog( i.toString(16) + " | " + "POP D");
                break;
            case 0xd2:
                appendLog( i.toString(16) + " | " + "JNC " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xd3:
                appendLog( i.toString(16) + " | " + "OUT D8");
                i++;
                break;
            case 0xd4:
                appendLog( i.toString(16) + " | " + "CNC " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xd5:
                appendLog( i.toString(16) + " | " + "PUSH D");
                break;
            case 0xd6:
                appendLog( i.toString(16) + " | " + "SUI D8");
                i++;
                break;
            case 0xd7:
                appendLog( i.toString(16) + " | " + "RST 2");
                break;
            case 0xd8:
                appendLog( i.toString(16) + " | " + "RC");
                break;
            case 0xda:
                appendLog( i.toString(16) + " | " + "JC " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xdb:
                appendLog( i.toString(16) + " | " + "IN D8");
                i++;
                break;
            case 0xdc:
                appendLog( i.toString(16) + " | " + "CC " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xde:
                appendLog( i.toString(16) + " | " + "SBI D8");
                i++;
                break;
            case 0xdf:
                appendLog( i.toString(16) + " | " + "RST 3");
                break;
            case 0xe0:
                appendLog( i.toString(16) + " | " + "RPO");
                break;
            case 0xe1:
                appendLog( i.toString(16) + " | " + "POP H");
                break;
            case 0xe2:
                appendLog( i.toString(16) + " | " + "JPO " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xe3:
                appendLog( i.toString(16) + " | " + "XTHL");
                break;
            case 0xe4:
                appendLog( i.toString(16) + " | " + "CPO " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xe5:
                appendLog( i.toString(16) + " | " + "PUSH H");
                break;
            case 0xe6:
                appendLog( i.toString(16) + " | " + "ANI D8");
                i++;
                break;
            case 0xe7:
                appendLog( i.toString(16) + " | " + "RST 4");
                break;
            case 0xe8:
                appendLog( i.toString(16) + " | " + "RPE");
                break;
            case 0xe9:
                appendLog( i.toString(16) + " | " + "PCHL");
                break;
            case 0xea:
                appendLog( i.toString(16) + " | " + "JPE " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xeb:
                appendLog( i.toString(16) + " | " + "XCHG");
                break;
            case 0xec:
                appendLog( i.toString(16) + " | " + "CPE " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xee:
                appendLog( i.toString(16) + " | " + "XRI D8");
                i++;
                break;
            case 0xef:
                appendLog( i.toString(16) + " | " + "RST 5");
                break;
            case 0xf0:
                appendLog( i.toString(16) + " | " + "RP");
                break;
            case 0xf1:
                appendLog( i.toString(16) + " | " + "POP PSW");
                break;
            case 0xf2:
                appendLog( i.toString(16) + " | " + "JP " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xf3:
                appendLog( i.toString(16) + " | " + "DI");
                break;
            case 0xf4:
                appendLog( i.toString(16) + " | " + "CP " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1]));
                i+= 2;
                break;
            case 0xf5:
                appendLog( i.toString(16) + " | " + "PUSH PSW");
                break;
            case 0xf6:
                appendLog( i.toString(16) + " | " + "ORI D8");
                i++;
                break;
            case 0xf7:
                appendLog( i.toString(16) + " | " + "RST 6");
                break;
            case 0xf8:
                appendLog( i.toString(16) + " | " + "RM");
                break;
            case 0xf9:
                appendLog( i.toString(16) + " | " + "SPHL");
                break;
            case 0xfa:
                appendLog( i.toString(16) + " | " + "JM " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                i+= 2;
                break;
            case 0xfb:
                appendLog( i.toString(16) + " | " + "EI");
                break;
            case 0xfc:
                appendLog( i.toString(16) + " | " + "CM " + toHexa(fileBufferView[i+2]) + toHexa(fileBufferView[i+1] ));
                break;
            case 0xfe:
                appendLog( i.toString(16) + " | " + "CPI D8");
                i++;
                break;
            case 0xff:
                appendLog( i.toString(16) + " | " + "RST 7");
                break;
            default:
                appendLog( i.toString(16) + " | " + "UNDEFINED");
                break;
        }
    }
}