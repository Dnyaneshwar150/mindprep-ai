import {
  Box,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Toolbar({ settings, onChange, printRef }) {
  const handleDownload = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let position = 0;

    if (imgHeight < pdfHeight) {
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    } else {
      let remainingHeight = imgHeight;
      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        remainingHeight -= pdfHeight;
        position -= pdfHeight;

        if (remainingHeight > 0) pdf.addPage();
      }
    }

    pdf.save("mindprep.pdf");
  };
  return (
    <Box
      display='flex'
      flexWrap='wrap'
      gap={2}
    >
      {/* Font Size (rem) */}
      <Box width={200}>
        <label>Font Size (rem)</label>
        <Slider
          min={0.25}
          max={1}
          step={0.05}
          value={settings.fontSize}
          onChange={(_, value) => onChange({ fontSize: value })}
        />
      </Box>

      {/* Heading Font Size (rem) */}
      <Box width={200}>
        <label>Heading Font Size (rem)</label>
        <Slider
          min={0.25}
          max={1}
          step={0.05}
          value={settings.headingFontSize}
          onChange={(_, value) => onChange({ headingFontSize: value })}
        />
      </Box>

      {/* Font Weight */}
      <FormControl size='small'>
        <InputLabel>Font Weight</InputLabel>
        <Select
          value={settings.fontWeight}
          label='Font Weight'
          onChange={(e) => onChange({ fontWeight: e.target.value })}
        >
          <MenuItem value={300}>Light (300)</MenuItem>
          <MenuItem value={400}>Regular (400)</MenuItem>
          <MenuItem value={700}>Bold (700)</MenuItem>
        </Select>
      </FormControl>

      {/* Heading Font Weight */}
      <FormControl size='small'>
        <InputLabel>Heading Weight</InputLabel>
        <Select
          value={settings.headingFontWeight}
          label='Heading Weight'
          onChange={(e) => onChange({ headingFontWeight: e.target.value })}
        >
          <MenuItem value={300}>Light (300)</MenuItem>
          <MenuItem value={400}>Regular (400)</MenuItem>
          <MenuItem value={700}>Bold (700)</MenuItem>
        </Select>
      </FormControl>

      {/* Line Height */}
      <Box width={200}>
        <label>Line Height</label>
        <Slider
          min={1}
          max={2.5}
          step={0.1}
          value={settings.lineHeight}
          onChange={(_, value) => onChange({ lineHeight: value })}
        />
      </Box>

      {/* Letter Spacing */}
      <Box width={200}>
        <label>Letter Spacing (rem)</label>
        <Slider
          min={-1}
          max={1}
          step={0.05}
          value={settings.letterSpacing}
          onChange={(_, value) => onChange({ letterSpacing: value })}
        />
      </Box>

      <Button
        variant='contained'
        color='primary'
        onClick={handleDownload}
        sx={{ height: 40 }}
      >
        📥 Download PDF
      </Button>
    </Box>
  );
}

export default Toolbar;
