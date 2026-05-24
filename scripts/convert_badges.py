import os
import sys
from PIL import Image

def convert_season_badges(target_dir):
    print(f"Scanning directory: {target_dir}")
    if not os.path.isdir(target_dir):
        print(f"Error: {target_dir} is not a valid directory.")
        return
        
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            # Look for badge PNG files, ignore helper/temp files
            if file.endswith('.png') and not file.endswith('_small.png') and not file.startswith('.'):
                badge_name = os.path.splitext(file)[0]
                png_path = os.path.join(root, file)
                webp_path = os.path.join(root, f"{badge_name}.webp")
                webp_small_path = os.path.join(root, f"{badge_name}_small.webp")
                
                print(f"Processing: {png_path}")
                try:
                    with Image.open(png_path) as img:
                        # Convert to RGBA to preserve transparency
                        img_rgba = img.convert("RGBA")
                        
                        # Save original size (512x512) WebP
                        img_rgba.save(webp_path, "WEBP", quality=90)
                        print(f"  -> Saved large webp: {webp_path}")
                        
                        # Resize to 80x80 and save small WebP for progress bar
                        img_small = img_rgba.resize((80, 80), Image.Resampling.LANCZOS)
                        img_small.save(webp_small_path, "WEBP", quality=85)
                        print(f"  -> Saved small webp: {webp_small_path}")
                except Exception as e:
                    print(f"  [ERROR] Failed to process {file}: {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, ".."))
    
    # Check if directory path is passed as command-line argument
    if len(sys.argv) > 1:
        target_dir = sys.argv[1]
        target_dir = os.path.abspath(target_dir)
    else:
        # Default to entire static directory if no argument is provided
        static_dir = os.path.join(project_root, "static")
        target_dir = static_dir
        print(f"No target directory provided. Defaulting to: {static_dir}")
    
    if not os.path.exists(target_dir):
        print(f"Error: Target path not found: {target_dir}")
        print("Usage: python scripts/convert_badges.py [path/to/season/folder]")
        sys.exit(1)
        
    print("Starting badge image conversion...")
    convert_season_badges(target_dir)
    print("Badge conversion process completed!")
