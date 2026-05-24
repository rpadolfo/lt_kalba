import sys
import os
try:
    import pypdf
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "--break-system-packages"])
    import pypdf

def extract_text(pdf_path, num_pages=30):
    print(f"Extracting {pdf_path}...")
    try:
        with open(pdf_path, "rb") as f:
            reader = pypdf.PdfReader(f)
            text = ""
            for i in range(min(num_pages, len(reader.pages))):
                text += f"\n--- Page {i+1} ---\n"
                extracted = reader.pages[i].extract_text()
                if extracted:
                    text += extracted
            return text
    except Exception as e:
        return f"Error extracting {pdf_path}: {e}"

base_dir = "/mnt/c/Users/rpado/Documents/Projects/lt_kalba"
dambriunas_path = os.path.join(base_dir, "base_reference", "Lithuanian, Beginner's (Dambriūnas, Klimas & Schmalstieg).pdf")
mano_path = os.path.join(base_dir, "base_reference", "Mano ir tavo salis Lietuva.pdf")

with open(os.path.join(base_dir, "scratch", "dambriunas_text.txt"), "w", encoding="utf-8") as f:
    f.write(extract_text(dambriunas_path, 30))

with open(os.path.join(base_dir, "scratch", "mano_ir_tavo_text.txt"), "w", encoding="utf-8") as f:
    f.write(extract_text(mano_path, 30))

print("Done")
