from __future__ import annotations

import json
import shutil
from html import escape
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src/data/cv.json"
OUTPUT_PATH = ROOT / "output/pdf/francis-del-castillo-cv.pdf"
PUBLIC_PATH = ROOT / "public/francis-del-castillo-cv.pdf"

INK = colors.HexColor("#151518")
MUTED = colors.HexColor("#5f5f66")
LINE = colors.HexColor("#d9d9dc")
ACCENT = colors.HexColor("#7a0c22")
CYAN = colors.HexColor("#1e6384")


def load_data() -> dict:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def link(label: str, url: str) -> str:
    return f'<link href="{escape(url)}" color="#151518">{escape(label)}</link>'


def section_title(label: str, styles: dict[str, ParagraphStyle]):
    return [
        Spacer(1, 3.5 * mm),
        HRFlowable(width="100%", thickness=0.55, color=LINE, spaceAfter=2.2 * mm),
        paragraph(escape(label.upper()), styles["section"]),
        Spacer(1, 1.5 * mm),
    ]


def build_pdf(data: dict) -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_PATH.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=A4,
        rightMargin=14 * mm,
        leftMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title=f"CV - {data['profile']['name']}",
        author=data["profile"]["name"],
        subject="Desarrollo creativo, frontend e interacción",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=23,
            leading=24,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=13,
            textColor=ACCENT,
        ),
        "brand": ParagraphStyle(
            "Brand",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=INK,
            alignment=TA_RIGHT,
        ),
        "meta_right": ParagraphStyle(
            "MetaRight",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.4,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.7,
            leading=10,
            textColor=MUTED,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=9,
            tracking=1.4,
            textColor=CYAN,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11.5,
            textColor=INK,
        ),
        "job": ParagraphStyle(
            "Job",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=INK,
        ),
        "period": ParagraphStyle(
            "Period",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "subrole": ParagraphStyle(
            "Subrole",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8.2,
            leading=10.8,
            textColor=MUTED,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            leftIndent=3.2 * mm,
            firstLineIndent=-3.2 * mm,
            textColor=INK,
            spaceAfter=1.1 * mm,
        ),
        "project": ParagraphStyle(
            "Project",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.85,
            leading=10.3,
            textColor=INK,
            spaceAfter=1.2 * mm,
        ),
        "skill": ParagraphStyle(
            "Skill",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.75,
            leading=10.2,
            textColor=INK,
            spaceAfter=0.8 * mm,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=6.8,
            leading=8,
            textColor=MUTED,
        ),
    }

    profile = data["profile"]
    story = []

    header_left = [
        paragraph(escape(profile["name"]), styles["name"]),
        paragraph(escape(profile["role"]), styles["role"]),
    ]
    header_right = [
        paragraph(escape(profile["brand"]), styles["brand"]),
        paragraph(
            f"{escape(profile['location'])}<br/>{escape(profile['availability'])}",
            styles["meta_right"],
        ),
    ]
    header = Table([[header_left, header_right]], colWidths=[126 * mm, 56 * mm])
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.extend([header, Spacer(1, 2.7 * mm)])

    contacts = "  |  ".join(
        [
            link(profile["email"], f"mailto:{profile['email']}"),
            link("linkedin.com/in/francisdead", profile["linkedin"]),
            link("github.com/Francisdelca", profile["github"]),
            link("franc.is.dead", "https://franc.is.dead"),
        ]
    )
    story.extend(
        [
            HRFlowable(width="100%", thickness=1.7, color=ACCENT, spaceAfter=2.1 * mm),
            paragraph(contacts, styles["contact"]),
        ]
    )

    story.extend(section_title("Perfil", styles))
    story.append(paragraph(escape(data["summary"]), styles["body"]))

    story.extend(section_title("Experiencia", styles))
    for item in data["experience"]:
        job_header = Table(
            [
                [
                    paragraph(escape(item["company"]), styles["job"]),
                    paragraph(escape(item["period"]), styles["period"]),
                ]
            ],
            colWidths=[132 * mm, 50 * mm],
        )
        job_header.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            )
        )
        block = [
            job_header,
            paragraph(escape(item["role"]), styles["subrole"]),
            Spacer(1, 1.2 * mm),
        ]
        block.extend(
            paragraph(f"- {escape(text)}", styles["bullet"])
            for text in item["cvResponsibilities"]
        )
        block.append(Spacer(1, 1.2 * mm))
        story.append(KeepTogether(block))

    story.extend(section_title("Proyectos seleccionados", styles))
    for project in data["selectedProjects"]:
        text = (
            f"<b>{escape(project['name'])}</b> - {escape(project['role'])} | "
            f"<font color=\"#5f5f66\">{escape(project['technologies'])}</font><br/>"
            f"{escape(project['description'])}"
        )
        story.append(paragraph(text, styles["project"]))

    story.extend(section_title("Formación", styles))
    for education in data["education"]:
        story.append(
            paragraph(
                f"<b>{escape(education['program'])}</b> - {escape(education['institution'])} | "
                f"{escape(education['status'])}, {escape(education['period'])}",
                styles["skill"],
            )
        )

    story.extend(section_title("Capacidades", styles))
    for skill in data["skills"]:
        story.append(
            paragraph(
                f"<b>{escape(skill['label'])}:</b> {escape(skill['items'])}",
                styles["skill"],
            )
        )

    def draw_page(canvas, _doc):
        canvas.saveState()
        canvas.setTitle(f"CV - {profile['name']}")
        canvas.setAuthor(profile["name"])
        canvas.setSubject("Desarrollo creativo, frontend e interacción")
        canvas.setKeywords(
            "frontend, creative developer, Astro, Vue, WordPress, full-stack, Perú"
        )
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.4)
        canvas.line(14 * mm, 8 * mm, A4[0] - 14 * mm, 8 * mm)
        canvas.setFont("Helvetica", 6.8)
        canvas.setFillColor(MUTED)
        canvas.drawString(14 * mm, 4.5 * mm, "Francis Del Castillo - CV")
        canvas.drawRightString(A4[0] - 14 * mm, 4.5 * mm, "franc.is.dead")
        canvas.restoreState()

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)

    reader = PdfReader(str(OUTPUT_PATH))
    if len(reader.pages) != 1:
        raise RuntimeError(
            f"El CV debe ocupar una página; se generaron {len(reader.pages)} páginas."
        )

    shutil.copy2(OUTPUT_PATH, PUBLIC_PATH)
    print(f"CV generado: {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Copia pública: {PUBLIC_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    build_pdf(load_data())
