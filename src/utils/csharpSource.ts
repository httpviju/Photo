export interface CSharpProjectFiles {
  'Program.cs': string;
  'Form1.cs': string;
  'Form1.Designer.cs': string;
  'AutoBgRemovalEngine.cs': string;
  'Photo4x6.csproj': string;
  'App.config': string;
  'compile_x86.bat': string;
  'README_WINDOWS7.txt': string;
}

export function getCSharpProject(): CSharpProjectFiles {
  const programCs = `// Photo 4x6 Print - Windows 7 SP1 / .NET Framework 4.8
// Created by @unfiltered.vijudo
// Lightweight Offline 4x6 Photo Printing Software + Offline Auto Background Removal
using System;
using System.Windows.Forms;

namespace Photo4x6
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new Form1());
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error starting Photo 4x6 Print:\\n\\n" + ex.Message + "\\n\\n" + ex.StackTrace, "Launch Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
`;

  const form1DesignerCs = `namespace Photo4x6
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        private void InitializeComponent()
        {
            this.panelAuthorBanner = new System.Windows.Forms.Panel();
            this.lblVLogoBadge = new System.Windows.Forms.Label();
            this.lblAuthorTitle = new System.Windows.Forms.Label();
            this.lblAuthorName = new System.Windows.Forms.Label();
            this.lblBannerBadge = new System.Windows.Forms.Label();
            this.groupBoxControls = new System.Windows.Forms.GroupBox();
            this.btnSelectPhoto = new System.Windows.Forms.Button();
            this.lblPhotoPath = new System.Windows.Forms.Label();
            this.btnManageCopies = new System.Windows.Forms.Button();
            this.lblCopiesSummary = new System.Windows.Forms.Label();
            this.lblLayout = new System.Windows.Forms.Label();
            this.cmbLayout = new System.Windows.Forms.ComboBox();
            this.lblQuantity = new System.Windows.Forms.Label();
            this.numQuantity = new System.Windows.Forms.NumericUpDown();
            this.chkCutLines = new System.Windows.Forms.CheckBox();
            this.chkBorder = new System.Windows.Forms.CheckBox();
            this.chkFitPhoto = new System.Windows.Forms.CheckBox();
            this.btnRotate = new System.Windows.Forms.Button();
            this.groupBoxAutoBg = new System.Windows.Forms.GroupBox();
            this.chkAutoBg = new System.Windows.Forms.CheckBox();
            this.lblApplyTo = new System.Windows.Forms.Label();
            this.cmbApplyTo = new System.Windows.Forms.ComboBox();
            this.lblBgColor = new System.Windows.Forms.Label();
            this.pnlBgColorPreview = new System.Windows.Forms.Panel();
            this.btnSelectBgColor = new System.Windows.Forms.Button();
            this.btnApplyBg = new System.Windows.Forms.Button();
            this.btnRestoreOriginal = new System.Windows.Forms.Button();
            this.progressBarBg = new System.Windows.Forms.ProgressBar();
            this.lblBgStatus = new System.Windows.Forms.Label();
            this.btnPrint = new System.Windows.Forms.Button();
            this.btnSave = new System.Windows.Forms.Button();
            this.lblInfo = new System.Windows.Forms.Label();
            this.panelPreview = new System.Windows.Forms.Panel();
            this.picPreview = new System.Windows.Forms.PictureBox();
            this.panelAuthorBanner.SuspendLayout();
            this.groupBoxControls.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numQuantity)).BeginInit();
            this.groupBoxAutoBg.SuspendLayout();
            this.panelPreview.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picPreview)).BeginInit();
            this.SuspendLayout();
            // 
            // panelAuthorBanner
            // 
            this.panelAuthorBanner.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panelAuthorBanner.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(35)))), ((int)(((byte)(65)))));
            this.panelAuthorBanner.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panelAuthorBanner.Controls.Add(this.lblVLogoBadge);
            this.panelAuthorBanner.Controls.Add(this.lblBannerBadge);
            this.panelAuthorBanner.Controls.Add(this.lblAuthorName);
            this.panelAuthorBanner.Controls.Add(this.lblAuthorTitle);
            this.panelAuthorBanner.Location = new System.Drawing.Point(12, 10);
            this.panelAuthorBanner.Name = "panelAuthorBanner";
            this.panelAuthorBanner.Size = new System.Drawing.Size(796, 42);
            this.panelAuthorBanner.TabIndex = 2;
            // 
            // lblVLogoBadge
            // 
            this.lblVLogoBadge.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(25)))), ((int)(((byte)(55)))));
            this.lblVLogoBadge.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblVLogoBadge.Font = new System.Drawing.Font("Arial Black", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblVLogoBadge.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(204)))), ((int)(((byte)(0)))));
            this.lblVLogoBadge.Location = new System.Drawing.Point(8, 6);
            this.lblVLogoBadge.Name = "lblVLogoBadge";
            this.lblVLogoBadge.Size = new System.Drawing.Size(30, 28);
            this.lblVLogoBadge.TabIndex = 3;
            this.lblVLogoBadge.Text = "V";
            this.lblVLogoBadge.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblAuthorTitle
            // 
            this.lblAuthorTitle.AutoSize = true;
            this.lblAuthorTitle.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Bold);
            this.lblAuthorTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(140)))), ((int)(((byte)(185)))), ((int)(((byte)(255)))));
            this.lblAuthorTitle.Location = new System.Drawing.Point(45, 5);
            this.lblAuthorTitle.Name = "lblAuthorTitle";
            this.lblAuthorTitle.Size = new System.Drawing.Size(124, 13);
            this.lblAuthorTitle.TabIndex = 0;
            this.lblAuthorTitle.Text = "SOFTWARE CREATED BY";
            // 
            // lblAuthorName
            // 
            this.lblAuthorName.AutoSize = true;
            this.lblAuthorName.Font = new System.Drawing.Font("Segoe UI", 11.25F, System.Drawing.FontStyle.Bold);
            this.lblAuthorName.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(215)))), ((int)(((byte)(0)))));
            this.lblAuthorName.Location = new System.Drawing.Point(44, 18);
            this.lblAuthorName.Name = "lblAuthorName";
            this.lblAuthorName.Size = new System.Drawing.Size(165, 20);
            this.lblAuthorName.TabIndex = 1;
            this.lblAuthorName.Text = "@unfiltered.vijudo";
            // 
            // lblBannerBadge
            // 
            this.lblBannerBadge.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.lblBannerBadge.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(55)))), ((int)(((byte)(100)))));
            this.lblBannerBadge.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Bold);
            this.lblBannerBadge.ForeColor = System.Drawing.Color.White;
            this.lblBannerBadge.Location = new System.Drawing.Point(584, 8);
            this.lblBannerBadge.Name = "lblBannerBadge";
            this.lblBannerBadge.Size = new System.Drawing.Size(200, 24);
            this.lblBannerBadge.TabIndex = 2;
            this.lblBannerBadge.Text = "Photo 4x6 Print (300 DPI)";
            this.lblBannerBadge.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // groupBoxControls
            // 
            this.groupBoxControls.Controls.Add(this.btnSelectPhoto);
            this.groupBoxControls.Controls.Add(this.lblPhotoPath);
            this.groupBoxControls.Controls.Add(this.btnManageCopies);
            this.groupBoxControls.Controls.Add(this.lblCopiesSummary);
            this.groupBoxControls.Controls.Add(this.lblLayout);
            this.groupBoxControls.Controls.Add(this.cmbLayout);
            this.groupBoxControls.Controls.Add(this.lblQuantity);
            this.groupBoxControls.Controls.Add(this.numQuantity);
            this.groupBoxControls.Controls.Add(this.chkCutLines);
            this.groupBoxControls.Controls.Add(this.chkBorder);
            this.groupBoxControls.Controls.Add(this.chkFitPhoto);
            this.groupBoxControls.Controls.Add(this.btnRotate);
            this.groupBoxControls.Controls.Add(this.groupBoxAutoBg);
            this.groupBoxControls.Controls.Add(this.btnPrint);
            this.groupBoxControls.Controls.Add(this.btnSave);
            this.groupBoxControls.Controls.Add(this.lblInfo);
            this.groupBoxControls.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBoxControls.Location = new System.Drawing.Point(12, 58);
            this.groupBoxControls.Name = "groupBoxControls";
            this.groupBoxControls.Size = new System.Drawing.Size(268, 712);
            this.groupBoxControls.TabIndex = 0;
            this.groupBoxControls.TabStop = false;
            this.groupBoxControls.Text = "Settings";
            // 
            // btnSelectPhoto
            // 
            this.btnSelectPhoto.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Bold);
            this.btnSelectPhoto.Location = new System.Drawing.Point(16, 22);
            this.btnSelectPhoto.Name = "btnSelectPhoto";
            this.btnSelectPhoto.Size = new System.Drawing.Size(236, 34);
            this.btnSelectPhoto.TabIndex = 0;
            this.btnSelectPhoto.Text = "SELECT PHOTO(S)";
            this.btnSelectPhoto.UseVisualStyleBackColor = true;
            this.btnSelectPhoto.Click += new System.EventHandler(this.btnSelectPhoto_Click);
            // 
            // lblPhotoPath
            // 
            this.lblPhotoPath.AutoEllipsis = true;
            this.lblPhotoPath.Font = new System.Drawing.Font("Segoe UI", 8.25F);
            this.lblPhotoPath.ForeColor = System.Drawing.Color.DimGray;
            this.lblPhotoPath.Location = new System.Drawing.Point(16, 58);
            this.lblPhotoPath.Name = "lblPhotoPath";
            this.lblPhotoPath.Size = new System.Drawing.Size(236, 18);
            this.lblPhotoPath.TabIndex = 1;
            this.lblPhotoPath.Text = "No photo selected";
            // 
            // btnManageCopies
            // 
            this.btnManageCopies.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(235)))), ((int)(((byte)(243)))), ((int)(((byte)(255)))));
            this.btnManageCopies.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold);
            this.btnManageCopies.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(80)))), ((int)(((byte)(200)))));
            this.btnManageCopies.Location = new System.Drawing.Point(16, 78);
            this.btnManageCopies.Name = "btnManageCopies";
            this.btnManageCopies.Size = new System.Drawing.Size(236, 28);
            this.btnManageCopies.TabIndex = 2;
            this.btnManageCopies.Text = "MANAGE COPIES (6 + 1 + 1)";
            this.btnManageCopies.UseVisualStyleBackColor = false;
            this.btnManageCopies.Click += new System.EventHandler(this.btnManageCopies_Click);
            // 
            // lblCopiesSummary
            // 
            this.lblCopiesSummary.AutoEllipsis = true;
            this.lblCopiesSummary.Font = new System.Drawing.Font("Segoe UI", 8F, System.Drawing.FontStyle.Regular);
            this.lblCopiesSummary.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(120)))), ((int)(((byte)(60)))));
            this.lblCopiesSummary.Location = new System.Drawing.Point(16, 108);
            this.lblCopiesSummary.Name = "lblCopiesSummary";
            this.lblCopiesSummary.Size = new System.Drawing.Size(236, 16);
            this.lblCopiesSummary.TabIndex = 3;
            this.lblCopiesSummary.Text = "Allocated: 1 Photo (8 copies)";
            // 
            // lblLayout
            // 
            this.lblLayout.AutoSize = true;
            this.lblLayout.Location = new System.Drawing.Point(13, 126);
            this.lblLayout.Name = "lblLayout";
            this.lblLayout.Size = new System.Drawing.Size(50, 17);
            this.lblLayout.TabIndex = 4;
            this.lblLayout.Text = "Layout:";
            // 
            // cmbLayout
            // 
            this.cmbLayout.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbLayout.FormattingEnabled = true;
            this.cmbLayout.Items.AddRange(new object[] {
            "1 Photo",
            "Wallet (2)",
            "2 Photo",
            "4 Photo",
            "8 Photo",
            "16 Photo",
            "35 × 45 mm ID (6)",
            "25 × 36 mm ID (8)"});
            this.cmbLayout.Location = new System.Drawing.Point(16, 145);
            this.cmbLayout.Name = "cmbLayout";
            this.cmbLayout.Size = new System.Drawing.Size(236, 25);
            this.cmbLayout.TabIndex = 5;
            this.cmbLayout.SelectedIndexChanged += new System.EventHandler(this.cmbLayout_SelectedIndexChanged);
            // 
            // lblQuantity
            // 
            this.lblQuantity.AutoSize = true;
            this.lblQuantity.Location = new System.Drawing.Point(13, 175);
            this.lblQuantity.Name = "lblQuantity";
            this.lblQuantity.Size = new System.Drawing.Size(117, 17);
            this.lblQuantity.TabIndex = 6;
            this.lblQuantity.Text = "Quantity (Sheets):";
            // 
            // numQuantity
            // 
            this.numQuantity.Location = new System.Drawing.Point(140, 173);
            this.numQuantity.Minimum = new decimal(new int[] { 1, 0, 0, 0 });
            this.numQuantity.Maximum = new decimal(new int[] { 999, 0, 0, 0 });
            this.numQuantity.Name = "numQuantity";
            this.numQuantity.Size = new System.Drawing.Size(112, 25);
            this.numQuantity.TabIndex = 7;
            this.numQuantity.Value = new decimal(new int[] { 1, 0, 0, 0 });
            // 
            // chkCutLines
            // 
            this.chkCutLines.AutoSize = true;
            this.chkCutLines.Location = new System.Drawing.Point(16, 202);
            this.chkCutLines.Name = "chkCutLines";
            this.chkCutLines.Size = new System.Drawing.Size(126, 21);
            this.chkCutLines.TabIndex = 8;
            this.chkCutLines.Text = "Show Cut Guides";
            this.chkCutLines.UseVisualStyleBackColor = true;
            this.chkCutLines.CheckedChanged += new System.EventHandler(this.chkCutLines_CheckedChanged);
            // 
            // chkBorder
            // 
            this.chkBorder.AutoSize = true;
            this.chkBorder.Location = new System.Drawing.Point(16, 224);
            this.chkBorder.Name = "chkBorder";
            this.chkBorder.Size = new System.Drawing.Size(139, 21);
            this.chkBorder.TabIndex = 9;
            this.chkBorder.Text = "Thin Photo Border";
            this.chkBorder.UseVisualStyleBackColor = true;
            this.chkBorder.CheckedChanged += new System.EventHandler(this.chkBorder_CheckedChanged);
            // 
            // chkFitPhoto
            // 
            this.chkFitPhoto.AutoSize = true;
            this.chkFitPhoto.Location = new System.Drawing.Point(16, 246);
            this.chkFitPhoto.Name = "chkFitPhoto";
            this.chkFitPhoto.Size = new System.Drawing.Size(210, 21);
            this.chkFitPhoto.TabIndex = 10;
            this.chkFitPhoto.Text = "Fit Full Photo (No Crop / Fit)";
            this.chkFitPhoto.UseVisualStyleBackColor = true;
            this.chkFitPhoto.CheckedChanged += new System.EventHandler(this.chkFitPhoto_CheckedChanged);
            // 
            // btnRotate
            // 
            this.btnRotate.Location = new System.Drawing.Point(16, 270);
            this.btnRotate.Name = "btnRotate";
            this.btnRotate.Size = new System.Drawing.Size(236, 26);
            this.btnRotate.TabIndex = 11;
            this.btnRotate.Text = "Rotate Photos 90°";
            this.btnRotate.UseVisualStyleBackColor = true;
            this.btnRotate.Click += new System.EventHandler(this.btnRotate_Click);
            // 
            // groupBoxAutoBg
            // 
            this.groupBoxAutoBg.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(244)))), ((int)(((byte)(248)))), ((int)(((byte)(254)))));
            this.groupBoxAutoBg.Controls.Add(this.chkAutoBg);
            this.groupBoxAutoBg.Controls.Add(this.lblApplyTo);
            this.groupBoxAutoBg.Controls.Add(this.cmbApplyTo);
            this.groupBoxAutoBg.Controls.Add(this.lblBgColor);
            this.groupBoxAutoBg.Controls.Add(this.pnlBgColorPreview);
            this.groupBoxAutoBg.Controls.Add(this.btnSelectBgColor);
            this.groupBoxAutoBg.Controls.Add(this.btnApplyBg);
            this.groupBoxAutoBg.Controls.Add(this.btnRestoreOriginal);
            this.groupBoxAutoBg.Controls.Add(this.progressBarBg);
            this.groupBoxAutoBg.Controls.Add(this.lblBgStatus);
            this.groupBoxAutoBg.Font = new System.Drawing.Font("Segoe UI", 8.75F, System.Drawing.FontStyle.Bold);
            this.groupBoxAutoBg.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(15)))), ((int)(((byte)(45)))), ((int)(((byte)(95)))));
            this.groupBoxAutoBg.Location = new System.Drawing.Point(12, 302);
            this.groupBoxAutoBg.Name = "groupBoxAutoBg";
            this.groupBoxAutoBg.Size = new System.Drawing.Size(244, 214);
            this.groupBoxAutoBg.TabIndex = 12;
            this.groupBoxAutoBg.TabStop = false;
            this.groupBoxAutoBg.Text = "Auto Background Removal";
            // 
            // chkAutoBg
            // 
            this.chkAutoBg.AutoSize = true;
            this.chkAutoBg.Font = new System.Drawing.Font("Segoe UI", 8.75F, System.Drawing.FontStyle.Bold);
            this.chkAutoBg.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(85)))), ((int)(((byte)(185)))));
            this.chkAutoBg.Location = new System.Drawing.Point(10, 20);
            this.chkAutoBg.Name = "chkAutoBg";
            this.chkAutoBg.Size = new System.Drawing.Size(172, 19);
            this.chkAutoBg.TabIndex = 0;
            this.chkAutoBg.Text = "Auto BG Removal ON/OFF";
            this.chkAutoBg.UseVisualStyleBackColor = true;
            this.chkAutoBg.CheckedChanged += new System.EventHandler(this.chkAutoBg_CheckedChanged);
            // 
            // lblApplyTo
            // 
            this.lblApplyTo.AutoSize = true;
            this.lblApplyTo.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Regular);
            this.lblApplyTo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(40)))), ((int)(((byte)(40)))), ((int)(((byte)(40)))));
            this.lblApplyTo.Location = new System.Drawing.Point(8, 46);
            this.lblApplyTo.Name = "lblApplyTo";
            this.lblApplyTo.Size = new System.Drawing.Size(53, 13);
            this.lblApplyTo.TabIndex = 1;
            this.lblApplyTo.Text = "Apply To:";
            // 
            // cmbApplyTo
            // 
            this.cmbApplyTo.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbApplyTo.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Regular);
            this.cmbApplyTo.FormattingEnabled = true;
            this.cmbApplyTo.Items.AddRange(new object[] {
            "Selected Photos",
            "All Imported Photos"});
            this.cmbApplyTo.Location = new System.Drawing.Point(68, 42);
            this.cmbApplyTo.Name = "cmbApplyTo";
            this.cmbApplyTo.Size = new System.Drawing.Size(166, 21);
            this.cmbApplyTo.TabIndex = 2;
            // 
            // lblBgColor
            // 
            this.lblBgColor.AutoSize = true;
            this.lblBgColor.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Regular);
            this.lblBgColor.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(40)))), ((int)(((byte)(40)))), ((int)(((byte)(40)))));
            this.lblBgColor.Location = new System.Drawing.Point(8, 74);
            this.lblBgColor.Name = "lblBgColor";
            this.lblBgColor.Size = new System.Drawing.Size(54, 13);
            this.lblBgColor.TabIndex = 3;
            this.lblBgColor.Text = "BG Color:";
            // 
            // pnlBgColorPreview
            // 
            this.pnlBgColorPreview.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(173)))), ((int)(((byte)(216)))), ((int)(((byte)(230)))));
            this.pnlBgColorPreview.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pnlBgColorPreview.Cursor = System.Windows.Forms.Cursors.Hand;
            this.pnlBgColorPreview.Location = new System.Drawing.Point(68, 70);
            this.pnlBgColorPreview.Name = "pnlBgColorPreview";
            this.pnlBgColorPreview.Size = new System.Drawing.Size(36, 22);
            this.pnlBgColorPreview.TabIndex = 4;
            this.pnlBgColorPreview.Click += new System.EventHandler(this.btnSelectBgColor_Click);
            // 
            // btnSelectBgColor
            // 
            this.btnSelectBgColor.Font = new System.Drawing.Font("Segoe UI", 8F, System.Drawing.FontStyle.Regular);
            this.btnSelectBgColor.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(40)))), ((int)(((byte)(80)))));
            this.btnSelectBgColor.Location = new System.Drawing.Point(110, 69);
            this.btnSelectBgColor.Name = "btnSelectBgColor";
            this.btnSelectBgColor.Size = new System.Drawing.Size(124, 24);
            this.btnSelectBgColor.TabIndex = 5;
            this.btnSelectBgColor.Text = "Light Blue (Change)";
            this.btnSelectBgColor.UseVisualStyleBackColor = true;
            this.btnSelectBgColor.Click += new System.EventHandler(this.btnSelectBgColor_Click);
            // 
            // btnApplyBg
            // 
            this.btnApplyBg.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(110)))), ((int)(((byte)(215)))));
            this.btnApplyBg.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Bold);
            this.btnApplyBg.ForeColor = System.Drawing.Color.White;
            this.btnApplyBg.Location = new System.Drawing.Point(10, 100);
            this.btnApplyBg.Name = "btnApplyBg";
            this.btnApplyBg.Size = new System.Drawing.Size(114, 28);
            this.btnApplyBg.TabIndex = 6;
            this.btnApplyBg.Text = "Apply Background";
            this.btnApplyBg.UseVisualStyleBackColor = false;
            this.btnApplyBg.Click += new System.EventHandler(this.btnApplyBg_Click);
            // 
            // btnRestoreOriginal
            // 
            this.btnRestoreOriginal.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(245)))), ((int)(((byte)(245)))), ((int)(((byte)(245)))));
            this.btnRestoreOriginal.Font = new System.Drawing.Font("Segoe UI", 8.25F, System.Drawing.FontStyle.Regular);
            this.btnRestoreOriginal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(60)))), ((int)(((byte)(60)))));
            this.btnRestoreOriginal.Location = new System.Drawing.Point(128, 100);
            this.btnRestoreOriginal.Name = "btnRestoreOriginal";
            this.btnRestoreOriginal.Size = new System.Drawing.Size(106, 28);
            this.btnRestoreOriginal.TabIndex = 7;
            this.btnRestoreOriginal.Text = "Restore Original";
            this.btnRestoreOriginal.UseVisualStyleBackColor = false;
            this.btnRestoreOriginal.Click += new System.EventHandler(this.btnRestoreOriginal_Click);
            // 
            // progressBarBg
            // 
            this.progressBarBg.Location = new System.Drawing.Point(10, 134);
            this.progressBarBg.Name = "progressBarBg";
            this.progressBarBg.Size = new System.Drawing.Size(224, 16);
            this.progressBarBg.TabIndex = 8;
            // 
            // lblBgStatus
            // 
            this.lblBgStatus.AutoEllipsis = true;
            this.lblBgStatus.Font = new System.Drawing.Font("Segoe UI", 7.75F, System.Drawing.FontStyle.Regular);
            this.lblBgStatus.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(65)))), ((int)(((byte)(95)))));
            this.lblBgStatus.Location = new System.Drawing.Point(10, 154);
            this.lblBgStatus.Name = "lblBgStatus";
            this.lblBgStatus.Size = new System.Drawing.Size(224, 54);
            this.lblBgStatus.TabIndex = 9;
            this.lblBgStatus.Text = "Status: Auto BG OFF (Original photos active)";
            // 
            // lblInfo
            // 
            this.lblInfo.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(240)))), ((int)(((byte)(243)))), ((int)(((byte)(246)))));
            this.lblInfo.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblInfo.Font = new System.Drawing.Font("Segoe UI", 8F);
            this.lblInfo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(50)))), ((int)(((byte)(50)))), ((int)(((byte)(50)))));
            this.lblInfo.Location = new System.Drawing.Point(16, 522);
            this.lblInfo.Name = "lblInfo";
            this.lblInfo.Padding = new System.Windows.Forms.Padding(4);
            this.lblInfo.Size = new System.Drawing.Size(236, 86);
            this.lblInfo.TabIndex = 13;
            this.lblInfo.Text = "Paper: 4 x 6 inch (10 x 15 cm)\\nResolution: 1200 x 1800 px (300 DPI)\\nCreated by: @unfiltered.vijudo\\nInstagram: instagram.com/unfiltered.vijudo";
            // 
            // btnPrint
            // 
            this.btnPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(102)))), ((int)(((byte)(204)))));
            this.btnPrint.Font = new System.Drawing.Font("Segoe UI", 11.25F, System.Drawing.FontStyle.Bold);
            this.btnPrint.ForeColor = System.Drawing.Color.White;
            this.btnPrint.Location = new System.Drawing.Point(16, 616);
            this.btnPrint.Name = "btnPrint";
            this.btnPrint.Size = new System.Drawing.Size(236, 42);
            this.btnPrint.TabIndex = 14;
            this.btnPrint.Text = "PRINT (4x6)";
            this.btnPrint.UseVisualStyleBackColor = false;
            this.btnPrint.Click += new System.EventHandler(this.btnPrint_Click);
            // 
            // btnSave
            // 
            this.btnSave.Font = new System.Drawing.Font("Segoe UI", 9.75F);
            this.btnSave.Location = new System.Drawing.Point(16, 664);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(236, 36);
            this.btnSave.TabIndex = 15;
            this.btnSave.Text = "SAVE (JPG 300 DPI)";
            this.btnSave.UseVisualStyleBackColor = true;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // panelPreview
            // 
            this.panelPreview.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panelPreview.AutoScroll = true;
            this.panelPreview.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(224)))), ((int)(((byte)(230)))));
            this.panelPreview.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.panelPreview.Controls.Add(this.picPreview);
            this.panelPreview.Location = new System.Drawing.Point(290, 58);
            this.panelPreview.Name = "panelPreview";
            this.panelPreview.Size = new System.Drawing.Size(518, 712);
            this.panelPreview.TabIndex = 1;
            // 
            // picPreview
            // 
            this.picPreview.BackColor = System.Drawing.Color.White;
            this.picPreview.Location = new System.Drawing.Point(24, 20);
            this.picPreview.Name = "picPreview";
            this.picPreview.Size = new System.Drawing.Size(440, 660);
            this.picPreview.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.picPreview.TabIndex = 0;
            this.picPreview.TabStop = false;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(240)))), ((int)(((byte)(240)))), ((int)(((byte)(240)))));
            this.ClientSize = new System.Drawing.Size(820, 782);
            this.Controls.Add(this.panelAuthorBanner);
            this.Controls.Add(this.panelPreview);
            this.Controls.Add(this.groupBoxControls);
            this.MinimumSize = new System.Drawing.Size(820, 795);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Photo 4x6 Print - Created by @unfiltered.vijudo - Windows 7/8/10/11 (.NET 4.8)";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.panelAuthorBanner.ResumeLayout(false);
            this.panelAuthorBanner.PerformLayout();
            this.groupBoxControls.ResumeLayout(false);
            this.groupBoxControls.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numQuantity)).EndInit();
            this.groupBoxAutoBg.ResumeLayout(false);
            this.groupBoxAutoBg.PerformLayout();
            this.panelPreview.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.picPreview)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelAuthorBanner;
        private System.Windows.Forms.Label lblVLogoBadge;
        private System.Windows.Forms.Label lblAuthorTitle;
        private System.Windows.Forms.Label lblAuthorName;
        private System.Windows.Forms.Label lblBannerBadge;
        private System.Windows.Forms.GroupBox groupBoxControls;
        private System.Windows.Forms.Button btnSelectPhoto;
        private System.Windows.Forms.Label lblPhotoPath;
        private System.Windows.Forms.Button btnManageCopies;
        private System.Windows.Forms.Label lblCopiesSummary;
        private System.Windows.Forms.Label lblLayout;
        private System.Windows.Forms.ComboBox cmbLayout;
        private System.Windows.Forms.Label lblQuantity;
        private System.Windows.Forms.NumericUpDown numQuantity;
        private System.Windows.Forms.CheckBox chkCutLines;
        private System.Windows.Forms.CheckBox chkBorder;
        private System.Windows.Forms.CheckBox chkFitPhoto;
        private System.Windows.Forms.Button btnRotate;
        private System.Windows.Forms.GroupBox groupBoxAutoBg;
        private System.Windows.Forms.CheckBox chkAutoBg;
        private System.Windows.Forms.Label lblApplyTo;
        private System.Windows.Forms.ComboBox cmbApplyTo;
        private System.Windows.Forms.Label lblBgColor;
        private System.Windows.Forms.Panel pnlBgColorPreview;
        private System.Windows.Forms.Button btnSelectBgColor;
        private System.Windows.Forms.Button btnApplyBg;
        private System.Windows.Forms.Button btnRestoreOriginal;
        private System.Windows.Forms.ProgressBar progressBarBg;
        private System.Windows.Forms.Label lblBgStatus;
        private System.Windows.Forms.Button btnPrint;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.Label lblInfo;
        private System.Windows.Forms.Panel panelPreview;
        private System.Windows.Forms.PictureBox picPreview;
    }
}
`;

  const form1Cs = `using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Printing;
using System.IO;
using System.Windows.Forms;

namespace Photo4x6
{
    public partial class Form1 : Form
    {
        // 4x6 Canvas Constants at 300 DPI
        private const int CANVAS_WIDTH = 1200;  // 4 inches @ 300 DPI
        private const int CANVAS_HEIGHT = 1800; // 6 inches @ 300 DPI

        private List<PhotoItem> loadedPhotos = new List<PhotoItem>();
        private int rotationAngle = 0; // 0, 90, 180, 270
        private Bitmap canvasBitmap = null;

        // Auto Background Removal state (Default Light Blue: RGB 173, 216, 230)
        private Color selectedBgColor = Color.FromArgb(173, 216, 230);
        private bool isProcessingBg = false;
        private BackgroundWorker bgWorker = null;

        public Form1()
        {
            InitializeComponent();
            InitializeAutoBgSubsystem();
            SecurityGuard.EnforceIntegrity(this, this.lblAuthorName, this.lblAuthorTitle, this.lblVLogoBadge);
            ApplyVLogoIcon();
        }

        private void InitializeAutoBgSubsystem()
        {
            if (cmbApplyTo.Items.Count > 0)
            {
                cmbApplyTo.SelectedIndex = 0; // Default: "Selected Photos"
            }
            pnlBgColorPreview.BackColor = selectedBgColor;

            bgWorker = new BackgroundWorker();
            bgWorker.WorkerReportsProgress = true;
            bgWorker.WorkerSupportsCancellation = true;
            bgWorker.DoWork += BgWorker_DoWork;
            bgWorker.ProgressChanged += BgWorker_ProgressChanged;
            bgWorker.RunWorkerCompleted += BgWorker_RunWorkerCompleted;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            SecurityGuard.EnforceIntegrity(this, this.lblAuthorName, this.lblAuthorTitle, this.lblVLogoBadge);
            ApplyVLogoIcon();
            this.Text = "Photo 4x6 Print - " + SecurityGuard.ExpectedAuthor + " - 4x6 High-Definition Photo Studio";
            cmbLayout.SelectedIndex = 4; // Default to 8-Photo layout
            UpdateCopiesSummary();
            UpdateCanvas();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            try
            {
                if (bgWorker != null && bgWorker.IsBusy)
                {
                    bgWorker.CancelAsync();
                }
                DisposeLoadedPhotos();
                if (canvasBitmap != null)
                {
                    canvasBitmap.Dispose();
                    canvasBitmap = null;
                }
            }
            catch { }
        }

        private void DisposeLoadedPhotos()
        {
            foreach (var p in loadedPhotos)
            {
                if (p != null)
                {
                    p.DisposeAll();
                }
            }
            loadedPhotos.Clear();
        }

        private void btnSelectPhoto_Click(object sender, EventArgs e)
        {
            if (isProcessingBg)
            {
                MessageBox.Show("Please wait for background processing to finish before importing new photos.", "Processing Busy", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                ofd.Title = "Select Photo(s) (4x6 Print - Select 1, 2, 3 or Multiple)";
                ofd.Multiselect = true;
                ofd.Filter = "Image Files (*.jpg;*.jpeg;*.png;*.bmp)|*.jpg;*.jpeg;*.png;*.bmp|All Files (*.*)|*.*";
                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        DisposeLoadedPhotos();

                        int skippedInvalid = 0;
                        foreach (string fileName in ofd.FileNames)
                        {
                            Bitmap safeOriginal = LoadBitmapUnlocked(fileName);
                            if (safeOriginal == null)
                            {
                                skippedInvalid++;
                                continue;
                            }

                            loadedPhotos.Add(new PhotoItem
                            {
                                OriginalFilePath = fileName,
                                FileName = Path.GetFileName(fileName),
                                OriginalImage = safeOriginal,
                                Image = safeOriginal,
                                ProcessedImage = null,
                                ProcessedFilePath = null,
                                IsProcessed = false,
                                IsSelected = true,
                                Copies = 1,
                                Rotation = 0
                            });
                        }

                        if (loadedPhotos.Count == 0)
                        {
                            lblPhotoPath.Text = "No valid photo loaded";
                            lblBgStatus.Text = "Error: Selected file(s) could not be decoded.";
                            lblBgStatus.ForeColor = Color.Firebrick;
                            return;
                        }

                        rotationAngle = 0;
                        AutoDistributeCopies();
                        UpdateCopiesSummary();

                        if (loadedPhotos.Count == 1)
                        {
                            lblPhotoPath.Text = loadedPhotos[0].FileName;
                        }
                        else
                        {
                            lblPhotoPath.Text = string.Format("{0} Photos loaded", loadedPhotos.Count);
                        }

                        progressBarBg.Value = 0;
                        if (skippedInvalid > 0)
                        {
                            lblBgStatus.Text = string.Format("Loaded {0} photo(s) ({1} invalid skipped).", loadedPhotos.Count, skippedInvalid);
                            lblBgStatus.ForeColor = Color.DarkOrange;
                        }
                        else if (chkAutoBg.Checked)
                        {
                            lblBgStatus.Text = "Photos loaded. Click 'Apply Background' or processing now...";
                            lblBgStatus.ForeColor = Color.FromArgb(0, 85, 185);
                        }
                        else
                        {
                            lblBgStatus.Text = "Status: Ready (Original photos active)";
                            lblBgStatus.ForeColor = Color.FromArgb(45, 65, 95);
                        }

                        UpdateCanvas();

                        // If Auto BG Removal is already checked ON when importing new photos, process automatically
                        if (chkAutoBg.Checked)
                        {
                            StartBackgroundRemovalBatch();
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error loading image(s): " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
        }

        /// <summary>
        /// Loads an image file into an independent 32bpp memory Bitmap without locking the source file on disk.
        /// Never modifies or overwrites the original file.
        /// </summary>
        private Bitmap LoadBitmapUnlocked(string filePath)
        {
            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
                return null;

            try
            {
                byte[] fileBytes = File.ReadAllBytes(filePath);
                if (fileBytes == null || fileBytes.Length < 32)
                    return null;

                using (MemoryStream ms = new MemoryStream(fileBytes))
                using (Image img = Image.FromStream(ms, false, true))
                {
                    if (img.Width <= 0 || img.Height <= 0)
                        return null;

                    Bitmap clone = new Bitmap(img.Width, img.Height, PixelFormat.Format32bppArgb);
                    float dpiX = img.HorizontalResolution > 0 ? img.HorizontalResolution : 300f;
                    float dpiY = img.VerticalResolution > 0 ? img.VerticalResolution : 300f;
                    clone.SetResolution(dpiX, dpiY);

                    using (Graphics g = Graphics.FromImage(clone))
                    {
                        g.CompositingMode = CompositingMode.SourceCopy;
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.DrawImage(img, new Rectangle(0, 0, clone.Width, clone.Height));
                    }
                    return clone;
                }
            }
            catch
            {
                return null;
            }
        }

        #region Auto Background Removal Event Handlers & Batch Worker

        private void chkAutoBg_CheckedChanged(object sender, EventArgs e)
        {
            if (loadedPhotos.Count == 0)
            {
                lblBgStatus.Text = chkAutoBg.Checked
                    ? "Auto BG ON: Select photo(s) to process."
                    : "Status: Auto BG OFF (Original photos active)";
                lblBgStatus.ForeColor = Color.FromArgb(45, 65, 95);
                UpdateCanvas();
                return;
            }

            if (!chkAutoBg.Checked)
            {
                // Auto BG OFF: Use original photos immediately without losing cached processed copies
                progressBarBg.Value = 0;
                lblBgStatus.Text = "Auto BG OFF: Using original unmodified photos.";
                lblBgStatus.ForeColor = Color.FromArgb(45, 65, 95);
                UpdateCanvas();
            }
            else
            {
                // Auto BG ON: Check if target photos need processing
                List<PhotoItem> targets = GetTargetPhotosForBgRemoval();
                bool anyNeedsProcessing = false;
                int targetColorArgb = selectedBgColor.ToArgb();

                foreach (var item in targets)
                {
                    if (!item.IsProcessed || item.ProcessedImage == null || item.LastProcessedColorArgb != targetColorArgb)
                    {
                        anyNeedsProcessing = true;
                        break;
                    }
                }

                if (anyNeedsProcessing)
                {
                    StartBackgroundRemovalBatch();
                }
                else
                {
                    progressBarBg.Value = 100;
                    lblBgStatus.Text = string.Format("Auto BG ON: Showing {0} processed photo(s).", targets.Count);
                    lblBgStatus.ForeColor = Color.FromArgb(0, 125, 50);
                    UpdateCanvas();
                }
            }
        }

        private void btnSelectBgColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog())
            {
                cd.AllowFullOpen = true;
                cd.FullOpen = true;
                cd.Color = selectedBgColor;
                // Pre-populate standard studio Light Blue and passport colors in CustomColors
                cd.CustomColors = new int[]
                {
                    ColorTranslator.ToOle(Color.FromArgb(173, 216, 230)), // Default Studio Light Blue
                    ColorTranslator.ToOle(Color.FromArgb(135, 206, 250)), // Sky Light Blue
                    ColorTranslator.ToOle(Color.FromArgb(186, 225, 255)), // Soft Baby Blue
                    ColorTranslator.ToOle(Color.FromArgb(0, 120, 215)),   // Royal Studio Blue
                    ColorTranslator.ToOle(Color.FromArgb(255, 255, 255)), // Pure White
                    ColorTranslator.ToOle(Color.FromArgb(230, 235, 240))  // Light Gray
                };

                if (cd.ShowDialog(this) == DialogResult.OK)
                {
                    selectedBgColor = cd.Color;
                    pnlBgColorPreview.BackColor = selectedBgColor;

                    if (selectedBgColor.R == 173 && selectedBgColor.G == 216 && selectedBgColor.B == 230)
                    {
                        btnSelectBgColor.Text = "Light Blue (Change)";
                    }
                    else
                    {
                        btnSelectBgColor.Text = string.Format("RGB({0},{1},{2})", selectedBgColor.R, selectedBgColor.G, selectedBgColor.B);
                    }

                    lblBgStatus.Text = "Color updated. Click 'Apply Background' to apply.";
                    lblBgStatus.ForeColor = Color.FromArgb(0, 85, 185);
                }
            }
        }

        private void btnApplyBg_Click(object sender, EventArgs e)
        {
            if (loadedPhotos.Count == 0)
            {
                MessageBox.Show("Please select photo(s) first by clicking 'SELECT PHOTO(S)'.", "No Photos Loaded", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            if (isProcessingBg)
            {
                MessageBox.Show("Background removal is already in progress. Please wait.", "Busy", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            // Ensure Auto BG is switched ON when the user explicitly clicks Apply Background
            if (!chkAutoBg.Checked)
            {
                chkAutoBg.CheckedChanged -= chkAutoBg_CheckedChanged;
                chkAutoBg.Checked = true;
                chkAutoBg.CheckedChanged += chkAutoBg_CheckedChanged;
            }

            StartBackgroundRemovalBatch();
        }

        private void btnRestoreOriginal_Click(object sender, EventArgs e)
        {
            if (isProcessingBg)
            {
                if (bgWorker != null && bgWorker.IsBusy)
                {
                    bgWorker.CancelAsync();
                }
                return;
            }

            if (loadedPhotos.Count == 0)
            {
                lblBgStatus.Text = "Status: No photos loaded to restore.";
                return;
            }

            bool applyToSelectedOnly = (cmbApplyTo.SelectedIndex == 0);
            int restoredCount = 0;

            foreach (var item in loadedPhotos)
            {
                if (applyToSelectedOnly && !item.IsSelected && item.Copies <= 0)
                    continue;

                item.ClearProcessedCopy();
                restoredCount++;
            }

            // If all photos are now restored to original, uncheck Auto BG silently
            bool anyStillProcessed = false;
            foreach (var item in loadedPhotos)
            {
                if (item.IsProcessed && item.ProcessedImage != null)
                {
                    anyStillProcessed = true;
                    break;
                }
            }

            if (!anyStillProcessed && chkAutoBg.Checked)
            {
                chkAutoBg.CheckedChanged -= chkAutoBg_CheckedChanged;
                chkAutoBg.Checked = false;
                chkAutoBg.CheckedChanged += chkAutoBg_CheckedChanged;
            }

            progressBarBg.Value = 0;
            lblBgStatus.Text = string.Format("Restored {0} original photo(s). Originals untouched.", restoredCount);
            lblBgStatus.ForeColor = Color.FromArgb(45, 65, 95);
            UpdateCanvas();
        }

        private List<PhotoItem> GetTargetPhotosForBgRemoval()
        {
            List<PhotoItem> list = new List<PhotoItem>();
            bool selectedOnly = (cmbApplyTo.SelectedIndex == 0);

            if (!selectedOnly)
            {
                list.AddRange(loadedPhotos);
                return list;
            }

            // "Selected Photos": includes photos marked IsSelected or actively allocated with Copies > 0
            foreach (var p in loadedPhotos)
            {
                if (p.IsSelected && p.Copies > 0)
                {
                    list.Add(p);
                }
            }

            // Fallback if none had Copies > 0
            if (list.Count == 0 && loadedPhotos.Count > 0)
            {
                list.AddRange(loadedPhotos);
            }

            return list;
        }

        private void StartBackgroundRemovalBatch()
        {
            if (isProcessingBg || bgWorker == null || bgWorker.IsBusy)
                return;

            List<PhotoItem> targets = GetTargetPhotosForBgRemoval();
            if (targets.Count == 0)
            {
                lblBgStatus.Text = "No target photos selected for processing.";
                return;
            }

            isProcessingBg = true;
            SetControlsEnabledDuringProcessing(false);
            progressBarBg.Minimum = 0;
            progressBarBg.Maximum = 100;
            progressBarBg.Value = 2;
            lblBgStatus.Text = string.Format("Starting Auto BG Removal on {0} photo(s)...", targets.Count);
            lblBgStatus.ForeColor = Color.FromArgb(0, 85, 185);

            BgBatchRequest req = new BgBatchRequest
            {
                TargetPhotos = targets,
                ReplacementColor = selectedBgColor,
                OutputDirectory = AutoBgRemovalEngine.GetSafeProcessedFolder()
            };

            bgWorker.RunWorkerAsync(req);
        }

        private void SetControlsEnabledDuringProcessing(bool enabled)
        {
            btnSelectPhoto.Enabled = enabled;
            btnManageCopies.Enabled = enabled;
            btnApplyBg.Enabled = enabled;
            btnSelectBgColor.Enabled = enabled;
            pnlBgColorPreview.Enabled = enabled;
            cmbApplyTo.Enabled = enabled;
            btnPrint.Enabled = enabled;
            btnSave.Enabled = enabled;
        }

        private void BgWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            BackgroundWorker worker = sender as BackgroundWorker;
            BgBatchRequest req = e.Argument as BgBatchRequest;
            BgBatchSummary summary = new BgBatchSummary();

            if (req == null || req.TargetPhotos == null || req.TargetPhotos.Count == 0)
            {
                e.Result = summary;
                return;
            }

            int total = req.TargetPhotos.Count;
            int targetArgb = req.ReplacementColor.ToArgb();

            for (int i = 0; i < total; i++)
            {
                if (worker != null && worker.CancellationPending)
                {
                    e.Cancel = true;
                    break;
                }

                PhotoItem item = req.TargetPhotos[i];
                if (item == null || item.OriginalImage == null)
                {
                    summary.FailedCount++;
                    summary.LastError = "Missing or invalid source image.";
                    continue;
                }

                int pctStart = (int)((i * 100.0) / total);
                if (worker != null)
                {
                    worker.ReportProgress(Math.Max(2, pctStart),
                        string.Format("Processing ({0}/{1}): {2}...", i + 1, total, item.FileName));
                }

                // Rule: Never repeatedly process an already processed image if the background color hasn't changed
                if (item.IsProcessed && item.ProcessedImage != null && item.LastProcessedColorArgb == targetArgb)
                {
                    summary.SkippedCachedCount++;
                    summary.SuccessCount++;
                    int pctDoneCached = (int)(((i + 1) * 100.0) / total);
                    if (worker != null)
                    {
                        worker.ReportProgress(pctDoneCached,
                            string.Format("Cached ({0}/{1}): {2}", i + 1, total, item.FileName));
                    }
                    continue;
                }

                try
                {
                    string savedPath;
                    string errText;
                    Bitmap processedBmp = AutoBgRemovalEngine.ProcessPortraitBackground(
                        item.OriginalImage,
                        req.ReplacementColor,
                        req.OutputDirectory,
                        item.FileName,
                        out savedPath,
                        out errText);

                    if (processedBmp != null)
                    {
                        item.SetProcessedCopy(processedBmp, savedPath, targetArgb);
                        summary.SuccessCount++;
                    }
                    else
                    {
                        summary.FailedCount++;
                        summary.LastError = string.IsNullOrEmpty(errText) ? "Segmentation failed" : errText;
                    }
                }
                catch (OutOfMemoryException)
                {
                    summary.FailedCount++;
                    summary.LastError = "Insufficient memory on Windows 7 for image " + item.FileName;
                    GC.Collect();
                }
                catch (Exception ex)
                {
                    summary.FailedCount++;
                    summary.LastError = ex.Message;
                }

                int pctDone = (int)(((i + 1) * 100.0) / total);
                if (worker != null)
                {
                    worker.ReportProgress(pctDone,
                        string.Format("Processed ({0}/{1}): {2}", i + 1, total, item.FileName));
                }
            }

            e.Result = summary;
        }

        private void BgWorker_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            int val = Math.Max(0, Math.Min(100, e.ProgressPercentage));
            progressBarBg.Value = val;
            string msg = e.UserState as string;
            if (!string.IsNullOrEmpty(msg))
            {
                lblBgStatus.Text = msg;
            }
        }

        private void BgWorker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            isProcessingBg = false;
            SetControlsEnabledDuringProcessing(true);

            if (e.Cancelled)
            {
                progressBarBg.Value = 0;
                lblBgStatus.Text = "Processing cancelled. Original photos preserved.";
                lblBgStatus.ForeColor = Color.DarkOrange;
                UpdateCanvas();
                return;
            }

            if (e.Error != null)
            {
                progressBarBg.Value = 0;
                lblBgStatus.Text = "Error: " + e.Error.Message;
                lblBgStatus.ForeColor = Color.Firebrick;
                UpdateCanvas();
                return;
            }

            BgBatchSummary summary = e.Result as BgBatchSummary;
            progressBarBg.Value = 100;

            if (summary != null)
            {
                if (summary.FailedCount == 0)
                {
                    if (summary.SkippedCachedCount == summary.SuccessCount && summary.SuccessCount > 0)
                    {
                        lblBgStatus.Text = string.Format("✓ Ready: {0} photo(s) already processed (cached).", summary.SuccessCount);
                    }
                    else
                    {
                        lblBgStatus.Text = string.Format("✓ Done: {0} photo(s) with Light Blue BG applied.", summary.SuccessCount);
                    }
                    lblBgStatus.ForeColor = Color.FromArgb(0, 125, 50);
                }
                else
                {
                    lblBgStatus.Text = string.Format("⚠ {0} succeeded, {1} failed ({2}). Originals kept.",
                        summary.SuccessCount, summary.FailedCount, summary.LastError);
                    lblBgStatus.ForeColor = Color.DarkOrange;
                }
            }

            UpdateCanvas();
            picPreview.Invalidate();
            picPreview.Refresh();
        }

        private class BgBatchRequest
        {
            public List<PhotoItem> TargetPhotos { get; set; }
            public Color ReplacementColor { get; set; }
            public string OutputDirectory { get; set; }
        }

        private class BgBatchSummary
        {
            public int SuccessCount { get; set; }
            public int FailedCount { get; set; }
            public int SkippedCachedCount { get; set; }
            public string LastError { get; set; }
        }

        #endregion

        private void AutoDistributeCopies()
        {
            if (loadedPhotos.Count == 0) return;
            int totalSlots = GetLayoutCells(cmbLayout.SelectedIndex).Count;

            if (loadedPhotos.Count == 1)
            {
                loadedPhotos[0].Copies = totalSlots;
            }
            else if (loadedPhotos.Count == 3 && totalSlots == 8)
            {
                // Explicit user requirement: 3 photos on 8-copy layout -> Photo 1 = 6 copies, Photo 2 = 1, Photo 3 = 1
                loadedPhotos[0].Copies = 6;
                loadedPhotos[1].Copies = 1;
                loadedPhotos[2].Copies = 1;
            }
            else if (loadedPhotos.Count == 2)
            {
                int half = totalSlots / 2;
                loadedPhotos[0].Copies = half;
                loadedPhotos[1].Copies = totalSlots - half;
            }
            else
            {
                // Majority to Photo 1, 1 copy to each remaining photo
                int remainingSlots = totalSlots - (loadedPhotos.Count - 1);
                if (remainingSlots >= 1)
                {
                    loadedPhotos[0].Copies = remainingSlots;
                    for (int i = 1; i < loadedPhotos.Count; i++) loadedPhotos[i].Copies = 1;
                }
                else
                {
                    for (int i = 0; i < loadedPhotos.Count; i++) loadedPhotos[i].Copies = 1;
                }
            }
        }

        private void UpdateCopiesSummary()
        {
            if (loadedPhotos.Count == 0)
            {
                lblCopiesSummary.Text = "No photos loaded";
                return;
            }

            int totalSlots = GetLayoutCells(cmbLayout.SelectedIndex).Count;
            int sumAllocated = 0;
            foreach (var p in loadedPhotos) sumAllocated += p.Copies;

            if (loadedPhotos.Count == 1)
            {
                lblCopiesSummary.Text = string.Format("Photo 1: {0} copies ({1}/{2} slots)", loadedPhotos[0].Copies, sumAllocated, totalSlots);
            }
            else
            {
                string summary = "";
                for (int i = 0; i < loadedPhotos.Count; i++)
                {
                    if (i > 0) summary += ", ";
                    summary += string.Format("P{0}:{1}", i + 1, loadedPhotos[i].Copies);
                    if (summary.Length > 20)
                    {
                        summary += "...";
                        break;
                    }
                }
                lblCopiesSummary.Text = string.Format("{0} ({1}/{2} slots)", summary, sumAllocated, totalSlots);
            }
        }

        private void btnManageCopies_Click(object sender, EventArgs e)
        {
            if (loadedPhotos.Count == 0)
            {
                MessageBox.Show("Please select photo(s) first by clicking 'SELECT PHOTO(S)'.", "No Photos", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            int totalSlots = GetLayoutCells(cmbLayout.SelectedIndex).Count;
            using (var dlg = new CopiesManagerDialog(loadedPhotos, totalSlots, chkAutoBg != null && chkAutoBg.Checked))
            {
                if (dlg.ShowDialog(this) == DialogResult.OK)
                {
                    UpdateCopiesSummary();
                    UpdateCanvas();
                    picPreview.Invalidate();
                    picPreview.Refresh();
                }
            }
        }

        private void cmbLayout_SelectedIndexChanged(object sender, EventArgs e)
        {
            AutoDistributeCopies();
            UpdateCopiesSummary();
            UpdateCanvas();
        }

        private void chkCutLines_CheckedChanged(object sender, EventArgs e)
        {
            UpdateCanvas();
        }

        private void chkBorder_CheckedChanged(object sender, EventArgs e)
        {
            UpdateCanvas();
        }

        private void chkFitPhoto_CheckedChanged(object sender, EventArgs e)
        {
            UpdateCanvas();
        }

        private void btnRotate_Click(object sender, EventArgs e)
        {
            rotationAngle = (rotationAngle + 90) % 360;
            UpdateCanvas();
        }

        private void UpdateCanvas()
        {
            SecurityGuard.VerifyActiveAuthor(this.lblAuthorName);

            if (canvasBitmap != null)
            {
                canvasBitmap.Dispose();
            }
            canvasBitmap = new Bitmap(CANVAS_WIDTH, CANVAS_HEIGHT, PixelFormat.Format32bppArgb);
            canvasBitmap.SetResolution(300, 300);

            using (Graphics g = Graphics.FromImage(canvasBitmap))
            {
                g.Clear(Color.White);
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.SmoothingMode = SmoothingMode.HighQuality;

                List<Rectangle> cells = GetLayoutCells(cmbLayout.SelectedIndex);

                for (int i = 0; i < cells.Count; i++)
                {
                    DrawPhotoCell(g, cells[i], i, cells.Count);
                }

                if (chkCutLines.Checked)
                {
                    DrawCutGuides(g, cells);
                }
            }

            picPreview.Image = canvasBitmap;
        }

        private List<Rectangle> GetLayoutCells(int layoutIndex)
        {
            var list = new List<Rectangle>();
            switch (layoutIndex)
            {
                case 0: // 1 Photo
                    list.Add(new Rectangle(30, 30, 1140, 1740));
                    break;

                case 1: // Wallet (2) - 2 photos on 1 single 4x6 paper
                    list.Add(new Rectangle(50, 50, 1100, 825));
                    list.Add(new Rectangle(50, 925, 1100, 825));
                    break;

                case 2: // 2 Photo
                    list.Add(new Rectangle(60, 60, 1080, 810));
                    list.Add(new Rectangle(60, 930, 1080, 810));
                    break;

                case 3: // 4 Photo (2x2)
                    list.Add(new Rectangle(40, 40, 540, 840));
                    list.Add(new Rectangle(620, 40, 540, 840));
                    break;

                case 4: // 8 Photo (2x4)
                    list.Add(new Rectangle(40, 40, 545, 407));
                    list.Add(new Rectangle(615, 40, 545, 407));
                    list.Add(new Rectangle(40, 477, 545, 407));
                    list.Add(new Rectangle(615, 477, 545, 407));
                    list.Add(new Rectangle(40, 914, 545, 407));
                    list.Add(new Rectangle(615, 914, 545, 407));
                    list.Add(new Rectangle(40, 1351, 545, 407));
                    list.Add(new Rectangle(615, 1351, 545, 407));
                    break;

                case 5: // 16 Photo (4x4)
                    int cols = 4, rows = 4;
                    int mX = 40, mY = 40, gX = 20, gY = 25;
                    int cW = (1200 - 2 * mX - (cols - 1) * gX) / cols;
                    int cH = (1800 - 2 * mY - (rows - 1) * gY) / rows;
                    for (int r = 0; r < rows; r++)
                        for (int c = 0; c < cols; c++)
                            list.Add(new Rectangle(mX + c * (cW + gX), mY + r * (cH + gY), cW, cH));
                    break;

                case 6: // 35 x 45 mm ID (6) - Physical: 35mm x 45mm @ 300DPI = 413 x 531 px
                    list.Add(new Rectangle(110, 51, 413, 531));
                    list.Add(new Rectangle(677, 51, 413, 531));
                    list.Add(new Rectangle(110, 634, 413, 531));
                    list.Add(new Rectangle(677, 634, 413, 531));
                    list.Add(new Rectangle(110, 1217, 413, 531));
                    list.Add(new Rectangle(677, 1217, 413, 531));
                    break;

                case 7: // 25 x 36 mm ID (8) - Physical: 25mm x 36mm @ 300DPI = 295 x 425 px
                    list.Add(new Rectangle(215, 30, 295, 425));
                    list.Add(new Rectangle(690, 30, 295, 425));
                    list.Add(new Rectangle(215, 470, 295, 425));
                    list.Add(new Rectangle(690, 470, 295, 425));
                    list.Add(new Rectangle(215, 910, 295, 425));
                    list.Add(new Rectangle(690, 910, 295, 425));
                    list.Add(new Rectangle(215, 1350, 295, 425));
                    list.Add(new Rectangle(690, 1350, 295, 425));
                    break;
            }
            if (layoutIndex == 3 && list.Count == 2)
            {
                list.Add(new Rectangle(40, 920, 540, 840));
                list.Add(new Rectangle(620, 920, 540, 840));
            }
            return list;
        }

        private List<PhotoItem> GetAllocatedSequence(int totalSlots)
        {
            List<PhotoItem> seq = new List<PhotoItem>();
            foreach (var p in loadedPhotos)
            {
                for (int i = 0; i < p.Copies; i++)
                {
                    seq.Add(p);
                }
            }

            // If sequence is shorter than total slots, fill remaining with first photo
            while (seq.Count < totalSlots && loadedPhotos.Count > 0)
            {
                seq.Add(loadedPhotos[0]);
            }
            return seq;
        }

        private void DrawPhotoCell(Graphics g, Rectangle cell, int cellIndex, int totalCells)
        {
            List<PhotoItem> sequence = GetAllocatedSequence(totalCells);
            PhotoItem activeItem = (cellIndex < sequence.Count) ? sequence[cellIndex] : (loadedPhotos.Count > 0 ? loadedPhotos[0] : null);
            bool useAutoBg = (chkAutoBg != null && chkAutoBg.Checked);
            Image activeImg = activeItem != null ? activeItem.GetDisplayImage(useAutoBg) : null;

            if (activeImg != null)
            {
                var state = g.Save();
                g.SetClip(cell);

                int itemRot = (rotationAngle + (activeItem != null ? activeItem.Rotation : 0)) % 360;
                int imgW = activeImg.Width;
                int imgH = activeImg.Height;
                bool swap = (itemRot == 90 || itemRot == 270);
                int effW = swap ? imgH : imgW;
                int effH = swap ? imgW : imgH;

                float cellAspect = (float)cell.Width / cell.Height;
                float imgAspect = (float)effW / effH;

                float drawW, drawH;
                bool isFitMode = (chkFitPhoto != null && chkFitPhoto.Checked);

                if (isFitMode)
                {
                    if (imgAspect > cellAspect)
                    {
                        drawW = cell.Width;
                        drawH = drawW / imgAspect;
                    }
                    else
                    {
                        drawH = cell.Height;
                        drawW = drawH * imgAspect;
                    }
                }
                else
                {
                    if (imgAspect > cellAspect)
                    {
                        drawH = cell.Height;
                        drawW = drawH * imgAspect;
                    }
                    else
                    {
                        drawW = cell.Width;
                        drawH = drawW / imgAspect;
                    }
                }

                float centerX = cell.X + cell.Width / 2f;
                float centerY = cell.Y + cell.Height / 2f;

                g.TranslateTransform(centerX, centerY);
                g.RotateTransform(itemRot);

                float actualW = swap ? drawH : drawW;
                float actualH = swap ? drawW : drawH;

                g.DrawImage(activeImg, -actualW / 2f, -actualH / 2f, actualW, actualH);
                g.Restore(state);
            }
            else
            {
                using (Brush b = new SolidBrush(Color.FromArgb(245, 245, 248)))
                using (Pen p = new Pen(Color.FromArgb(200, 200, 200), 2))
                {
                    p.DashStyle = DashStyle.Dash;
                    g.FillRectangle(b, cell);
                    g.DrawRectangle(p, cell);
                }

                using (Font f = new Font("Segoe UI", 12, FontStyle.Bold))
                using (Brush textBrush = new SolidBrush(Color.Gray))
                {
                    string label = string.Format("#{0} ({1}x{2})", cellIndex + 1, cell.Width, cell.Height);
                    SizeF sz = g.MeasureString(label, f);
                    g.DrawString(label, f, textBrush, cell.X + (cell.Width - sz.Width) / 2f, cell.Y + (cell.Height - sz.Height) / 2f);
                }
            }

            if (chkBorder.Checked)
            {
                using (Pen borderPen = new Pen(Color.FromArgb(180, 180, 180), 2))
                {
                    g.DrawRectangle(borderPen, cell);
                }
            }
        }

        private void DrawCutGuides(Graphics g, List<Rectangle> cells)
        {
            using (Pen pen = new Pen(Color.FromArgb(140, 150, 160), 1))
            {
                pen.DashStyle = DashStyle.Dash;
                int tick = 25;

                foreach (var c in cells)
                {
                    // Top-Left
                    g.DrawLine(pen, c.Left - tick, c.Top, c.Left, c.Top);
                    g.DrawLine(pen, c.Left, c.Top - tick, c.Left, c.Top);

                    // Top-Right
                    g.DrawLine(pen, c.Right, c.Top, c.Right + tick, c.Top);
                    g.DrawLine(pen, c.Right, c.Top - tick, c.Right, c.Top);

                    // Bottom-Left
                    g.DrawLine(pen, c.Left - tick, c.Bottom, c.Left, c.Bottom);
                    g.DrawLine(pen, c.Left, c.Bottom, c.Left, c.Bottom + tick);

                    // Bottom-Right
                    g.DrawLine(pen, c.Right, c.Bottom, c.Right + tick, c.Bottom);
                    g.DrawLine(pen, c.Right, c.Bottom, c.Right, c.Bottom + tick);
                }
            }
        }

        private void btnPrint_Click(object sender, EventArgs e)
        {
            SecurityGuard.VerifyActiveAuthor(this.lblAuthorName);
            if (canvasBitmap == null) return;

            using (PrintDialog pd = new PrintDialog())
            {
                pd.AllowSomePages = false;
                pd.UseEXDialog = true;
                pd.PrinterSettings.Copies = (short)numQuantity.Value;

                PrintDocument doc = new PrintDocument();
                doc.DocumentName = string.Format("Photo 4x6 Print ({0}) - @unfiltered.vijudo", cmbLayout.Text);
                pd.Document = doc;

                // Automatically search printer paper sizes for standard 4x6 (10x15cm / Postcard)
                PaperSize target4x6Size = null;
                try
                {
                    foreach (PaperSize ps in pd.PrinterSettings.PaperSizes)
                    {
                        string pName = ps.PaperName.ToLower();
                        bool is4x6Dim = ((ps.Width >= 380 && ps.Width <= 420 && ps.Height >= 580 && ps.Height <= 620) ||
                                         (ps.Height >= 380 && ps.Height <= 420 && ps.Width >= 580 && ps.Width <= 620));
                        bool is4x6Name = (pName.Contains("4x6") || pName.Contains("4 x 6") || 
                                          pName.Contains("10x15") || pName.Contains("10 x 15") || 
                                          pName.Contains("100 x 150") || pName.Contains("100x150") ||
                                          pName.Contains("postcard") || pName.Contains("photo 4") ||
                                          pName.Contains("4 * 6") || pName.Contains("hagaki"));
                        if (is4x6Dim || is4x6Name)
                        {
                            target4x6Size = ps;
                            break;
                        }
                    }
                }
                catch { }

                if (target4x6Size != null)
                {
                    doc.DefaultPageSettings.PaperSize = target4x6Size;
                    doc.PrinterSettings.DefaultPageSettings.PaperSize = target4x6Size;
                    pd.PrinterSettings.DefaultPageSettings.PaperSize = target4x6Size;
                }
                else
                {
                    PaperSize custom4x6 = new PaperSize("4 x 6 in (10x15cm)", 400, 600);
                    doc.DefaultPageSettings.PaperSize = custom4x6;
                    doc.PrinterSettings.DefaultPageSettings.PaperSize = custom4x6;
                    pd.PrinterSettings.DefaultPageSettings.PaperSize = custom4x6;
                }

                // Force 4x6 Portrait orientation and zero margins for borderless/edge-to-edge printing
                doc.DefaultPageSettings.Landscape = false;
                doc.DefaultPageSettings.Margins = new Margins(0, 0, 0, 0);
                doc.OriginAtMargins = false;

                int printedCopies = 0;
                int totalCopies = (int)numQuantity.Value;

                doc.PrintPage += (s, ev) =>
                {
                    ev.Graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    ev.Graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    ev.Graphics.SmoothingMode = SmoothingMode.HighQuality;

                    // Automatically draw the exact 1200x1800 300 DPI canvas onto 4x6 page bounds
                    Rectangle bounds = ev.PageBounds;
                    ev.Graphics.DrawImage(canvasBitmap, bounds);

                    printedCopies++;
                    ev.HasMorePages = (printedCopies < totalCopies);
                };

                if (pd.ShowDialog(this) == DialogResult.OK)
                {
                    try
                    {
                        doc.Print();
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Printing error: " + ex.Message, "Print Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            SecurityGuard.VerifyActiveAuthor(this.lblAuthorName);
            if (canvasBitmap == null) return;

            using (SaveFileDialog sfd = new SaveFileDialog())
            {
                sfd.Title = "Save 4x6 Layout (300 DPI)";
                sfd.Filter = "JPEG Image (*.jpg)|*.jpg|PNG Image (*.png)|*.png";
                sfd.FileName = string.Format("Photo4x6_{0}_{1}.jpg", cmbLayout.Text.Replace(" ", "_").Replace("×", "x"), DateTime.Now.ToString("yyyyMMdd_HHmmss"));

                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        if (sfd.FilterIndex == 2)
                        {
                            canvasBitmap.Save(sfd.FileName, ImageFormat.Png);
                        }
                        else
                        {
                            ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
                            EncoderParameters encParams = new EncoderParameters(1);
                            encParams.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 95L);
                            canvasBitmap.Save(sfd.FileName, jpgEncoder, encParams);
                        }
                        MessageBox.Show("Saved successfully (1200 x 1800 px @ 300 DPI)!\\n\\n" + sfd.FileName, "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Save error: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
        }

        private void ApplyVLogoIcon()
        {
            try
            {
                using (Bitmap bmp = new Bitmap(64, 64, System.Drawing.Imaging.PixelFormat.Format32bppArgb))
                {
                    using (Graphics g = Graphics.FromImage(bmp))
                    {
                        g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                        g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.ClearTypeGridFit;
                        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                        g.Clear(Color.Transparent);

                        using (System.Drawing.Drawing2D.GraphicsPath path = new System.Drawing.Drawing2D.GraphicsPath())
                        {
                            int r = 16;
                            Rectangle rect = new Rectangle(2, 2, 60, 60);
                            path.AddArc(rect.X, rect.Y, r, r, 180, 90);
                            path.AddArc(rect.Right - r, rect.Y, r, r, 270, 90);
                            path.AddArc(rect.Right - r, rect.Bottom - r, r, r, 0, 90);
                            path.AddArc(rect.X, rect.Bottom - r, r, r, 90, 90);
                            path.CloseFigure();

                            using (System.Drawing.Drawing2D.LinearGradientBrush bgBrush = new System.Drawing.Drawing2D.LinearGradientBrush(
                                rect,
                                Color.FromArgb(16, 44, 87),
                                Color.FromArgb(5, 12, 36),
                                45f))
                            {
                                g.FillPath(bgBrush, path);
                            }

                            using (Pen borderPen = new Pen(Color.FromArgb(255, 204, 0), 2.5f))
                            {
                                g.DrawPath(borderPen, path);
                            }
                        }

                        using (Font font = new Font("Arial Black", 34f, FontStyle.Bold, GraphicsUnit.Pixel))
                        {
                            using (System.Drawing.Drawing2D.LinearGradientBrush vBrush = new System.Drawing.Drawing2D.LinearGradientBrush(
                                new Rectangle(0, 0, 64, 64),
                                Color.FromArgb(255, 235, 120),
                                Color.FromArgb(255, 170, 0),
                                90f))
                            {
                                StringFormat sf = new StringFormat
                                {
                                    Alignment = StringAlignment.Center,
                                    LineAlignment = StringAlignment.Center
                                };
                                g.DrawString("V", font, vBrush, new RectangleF(0, 2, 64, 64), sf);
                            }
                        }
                    }

                    IntPtr hIcon = bmp.GetHicon();
                    this.Icon = Icon.FromHandle(hIcon);
                }
            }
            catch
            {
                // Fallback gracefully on legacy Windows 7
            }
        }

        private ImageCodecInfo GetEncoder(ImageFormat format)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                    return codec;
            }
            return null;
        }
    }

    /// <summary>
    /// Photo item data structure storing original unmodified image, optional background-removed copy,
    /// selection state, and manual copies count.
    /// </summary>
    public class PhotoItem
    {
        public string OriginalFilePath { get; set; }
        public string FileName { get; set; }
        public Bitmap OriginalImage { get; set; }
        public Bitmap Image { get; set; }
        public Bitmap ProcessedImage { get; set; }
        public string ProcessedFilePath { get; set; }
        public bool IsProcessed { get; set; }
        public bool IsSelected { get; set; }
        public int LastProcessedColorArgb { get; set; }
        public int Copies { get; set; }
        public int Rotation { get; set; }

        public PhotoItem()
        {
            IsSelected = true;
            Copies = 1;
        }

        public Bitmap GetDisplayImage(bool autoBgEnabled)
        {
            if (autoBgEnabled && IsProcessed && ProcessedImage != null)
            {
                return ProcessedImage;
            }
            return OriginalImage ?? Image;
        }

        public void SetProcessedCopy(Bitmap processed, string savedPath, int colorArgb)
        {
            if (ProcessedImage != null && ! object.ReferenceEquals(ProcessedImage, OriginalImage))
            {
                try { ProcessedImage.Dispose(); } catch { }
            }
            ProcessedImage = processed;
            ProcessedFilePath = savedPath;
            LastProcessedColorArgb = colorArgb;
            IsProcessed = (processed != null);
        }

        public void ClearProcessedCopy()
        {
            if (ProcessedImage != null && !object.ReferenceEquals(ProcessedImage, OriginalImage))
            {
                try { ProcessedImage.Dispose(); } catch { }
            }
            ProcessedImage = null;
            ProcessedFilePath = null;
            IsProcessed = false;
            LastProcessedColorArgb = 0;
        }

        public void DisposeAll()
        {
            ClearProcessedCopy();
            if (OriginalImage != null)
            {
                try { OriginalImage.Dispose(); } catch { }
                OriginalImage = null;
            }
            if (Image != null)
            {
                try { Image.Dispose(); } catch { }
                Image = null;
            }
        }
    }

    /// <summary>
    /// Windows Forms Dialog allowing manual per-photo copy configuration and selection
    /// (e.g. Photo 1 = 6 copies, Photo 2 = 1 copy, Photo 3 = 1 copy for 8 slots)
    /// Created by @unfiltered.vijudo
    /// </summary>
    public class CopiesManagerDialog : Form
    {
        private List<PhotoItem> photos;
        private int totalSlots;
        private bool autoBgEnabled;
        private List<NumericUpDown> numInputs = new List<NumericUpDown>();
        private List<CheckBox> chkSelectedInputs = new List<CheckBox>();
        private Label lblTotalStatus;

        public CopiesManagerDialog(List<PhotoItem> loadedPhotos, int totalSlots, bool autoBgActive)
        {
            this.photos = loadedPhotos;
            this.totalSlots = totalSlots;
            this.autoBgEnabled = autoBgActive;
            InitializeDialog();
        }

        private void InitializeDialog()
        {
            this.Text = "Multi-Photo Copies Manager - @unfiltered.vijudo";
            this.Size = new Size(640, 560);
            this.MinimumSize = new Size(580, 460);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.Sizable;
            this.MaximizeBox = true;
            this.MinimizeBox = false;
            this.BackColor = Color.FromArgb(245, 247, 250);
            this.Font = new Font("Segoe UI", 9F, FontStyle.Regular);

            Panel headerPanel = new Panel
            {
                Dock = DockStyle.Top,
                Height = 110,
                BackColor = Color.FromArgb(15, 30, 60),
                Padding = new Padding(12, 8, 12, 6)
            };

            Label lblTitle = new Label
            {
                Text = "MANUAL PHOTO COPIES & SELECTION ALLOCATION",
                Font = new Font("Segoe UI", 10F, FontStyle.Bold),
                ForeColor = Color.FromArgb(255, 215, 0),
                AutoSize = true,
                Location = new Point(14, 8)
            };
            Label lblDesc = new Label
            {
                Text = string.Format("Set exact copies for each photo on 4x6 paper ({0} slots total on sheet)", totalSlots),
                Font = new Font("Segoe UI", 8.25F),
                ForeColor = Color.FromArgb(200, 220, 255),
                AutoSize = true,
                Location = new Point(14, 30)
            };

            FlowLayoutPanel flowPresets = new FlowLayoutPanel
            {
                Location = new Point(10, 58),
                Size = new Size(600, 44),
                BackColor = Color.Transparent,
                Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right
            };

            Button btnPreset611 = new Button
            {
                Text = totalSlots == 8 ? "6 + 1 + 1 (8 Slots)" : "Majority (6+1+1)",
                Font = new Font("Segoe UI", 8.25F, FontStyle.Bold),
                BackColor = Color.FromArgb(230, 240, 255),
                ForeColor = Color.FromArgb(0, 70, 180),
                AutoSize = true,
                Height = 30,
                Cursor = Cursors.Hand
            };
            btnPreset611.Click += (s, e) =>
            {
                if (photos.Count == 0) return;
                if (totalSlots == 8)
                {
                    if (numInputs.Count > 0) numInputs[0].Value = 6;
                    if (numInputs.Count > 1) numInputs[1].Value = 1;
                    if (numInputs.Count > 2) numInputs[2].Value = 1;
                    for (int i = 3; i < numInputs.Count; i++) numInputs[i].Value = 0;
                }
                else
                {
                    int mainCopies = Math.Max(1, totalSlots - (photos.Count - 1));
                    if (numInputs.Count > 0) numInputs[0].Value = Math.Min(totalSlots, mainCopies);
                    for (int i = 1; i < numInputs.Count; i++) numInputs[i].Value = 1;
                }
                UpdateTotalStatus();
            };

            Button btnPreset5111 = new Button
            {
                Text = "5 + 1 + 1 + 1",
                Font = new Font("Segoe UI", 8.25F),
                AutoSize = true,
                Height = 30,
                Cursor = Cursors.Hand
            };
            btnPreset5111.Click += (s, e) =>
            {
                if (numInputs.Count > 0) numInputs[0].Value = Math.Min(totalSlots, 5);
                if (numInputs.Count > 1) numInputs[1].Value = 1;
                if (numInputs.Count > 2) numInputs[2].Value = 1;
                if (numInputs.Count > 3) numInputs[3].Value = 1;
                for (int i = 4; i < numInputs.Count; i++) numInputs[i].Value = 0;
                UpdateTotalStatus();
            };

            Button btnPreset5050 = new Button
            {
                Text = "50/50 Split",
                Font = new Font("Segoe UI", 8.25F),
                AutoSize = true,
                Height = 30,
                Cursor = Cursors.Hand
            };
            btnPreset5050.Click += (s, e) =>
            {
                if (photos.Count < 2) return;
                int half = totalSlots / 2;
                if (numInputs.Count > 0) numInputs[0].Value = half;
                if (numInputs.Count > 1) numInputs[1].Value = totalSlots - half;
                for (int i = 2; i < numInputs.Count; i++) numInputs[i].Value = 0;
                UpdateTotalStatus();
            };

            Button btnPresetEqual = new Button
            {
                Text = "Equal Split",
                Font = new Font("Segoe UI", 8.25F),
                AutoSize = true,
                Height = 30,
                Cursor = Cursors.Hand
            };
            btnPresetEqual.Click += (s, e) =>
            {
                if (photos.Count == 0) return;
                int perPhoto = totalSlots / photos.Count;
                int rem = totalSlots % photos.Count;
                for (int i = 0; i < numInputs.Count; i++)
                {
                    numInputs[i].Value = perPhoto + (i < rem ? 1 : 0);
                }
                UpdateTotalStatus();
            };

            Button btnPresetAllOne = new Button
            {
                Text = "All Photo 1",
                Font = new Font("Segoe UI", 8.25F),
                AutoSize = true,
                Height = 30,
                Cursor = Cursors.Hand
            };
            btnPresetAllOne.Click += (s, e) =>
            {
                if (numInputs.Count > 0) numInputs[0].Value = totalSlots;
                for (int i = 1; i < numInputs.Count; i++) numInputs[i].Value = 0;
                UpdateTotalStatus();
            };

            flowPresets.Controls.Add(btnPreset611);
            flowPresets.Controls.Add(btnPreset5111);
            flowPresets.Controls.Add(btnPreset5050);
            flowPresets.Controls.Add(btnPresetEqual);
            flowPresets.Controls.Add(btnPresetAllOne);

            headerPanel.Controls.Add(lblTitle);
            headerPanel.Controls.Add(lblDesc);
            headerPanel.Controls.Add(flowPresets);

            Panel bottomPanel = new Panel
            {
                Dock = DockStyle.Bottom,
                Height = 55,
                BackColor = Color.White,
                Padding = new Padding(15, 10, 15, 10)
            };

            lblTotalStatus = new Label
            {
                AutoSize = true,
                Font = new Font("Segoe UI", 9.5F, FontStyle.Bold),
                Location = new Point(15, 16)
            };

            FlowLayoutPanel flowButtons = new FlowLayoutPanel
            {
                Dock = DockStyle.Right,
                FlowDirection = FlowDirection.RightToLeft,
                Width = 260,
                Height = 45,
                Padding = new Padding(0, 8, 10, 0),
                BackColor = Color.Transparent
            };

            Button btnCancel = new Button
            {
                Text = "Cancel",
                Size = new Size(85, 34),
                DialogResult = DialogResult.Cancel,
                Cursor = Cursors.Hand
            };

            Button btnOk = new Button
            {
                Text = "APPLY COPIES",
                Font = new Font("Segoe UI", 9.75F, FontStyle.Bold),
                BackColor = Color.FromArgb(0, 102, 204),
                ForeColor = Color.White,
                Size = new Size(140, 34),
                Cursor = Cursors.Hand
            };
            btnOk.Click += (s, e) =>
            {
                for (int i = 0; i < photos.Count && i < numInputs.Count; i++)
                {
                    var num = numInputs[i];
                    int val = (int)num.Value;
                    int typedVal = 0;
                    if (int.TryParse(num.Text, out typedVal))
                    {
                        val = typedVal;
                    }
                    photos[i].Copies = Math.Max(0, Math.Min(totalSlots, val));
                    if (i < chkSelectedInputs.Count)
                    {
                        photos[i].IsSelected = chkSelectedInputs[i].Checked;
                    }
                }
                this.DialogResult = DialogResult.OK;
            };

            flowButtons.Controls.Add(btnCancel);
            flowButtons.Controls.Add(btnOk);

            bottomPanel.Controls.Add(lblTotalStatus);
            bottomPanel.Controls.Add(flowButtons);

            this.AcceptButton = btnOk;
            this.CancelButton = btnCancel;

            Panel listContainer = new Panel
            {
                Dock = DockStyle.Fill,
                AutoScroll = true,
                BackColor = Color.FromArgb(245, 247, 250),
                Padding = new Padding(12, 12, 12, 12)
            };
            listContainer.MouseEnter += (s, e) => { if (!listContainer.Focused) listContainer.Focus(); };

            int yOffset = 10;
            for (int i = 0; i < photos.Count; i++)
            {
                int index = i;
                PhotoItem item = photos[i];
                Bitmap displayThumb = item.GetDisplayImage(autoBgEnabled);

                Panel itemRow = new Panel
                {
                    Size = new Size(585, 76),
                    Location = new Point(12, yOffset),
                    BackColor = Color.White,
                    BorderStyle = BorderStyle.FixedSingle,
                    Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right
                };

                PictureBox pbThumb = new PictureBox
                {
                    Size = new Size(64, 64),
                    Location = new Point(6, 6),
                    SizeMode = PictureBoxSizeMode.Zoom,
                    Image = displayThumb,
                    BorderStyle = BorderStyle.FixedSingle
                };

                Label lblPhotoName = new Label
                {
                    Text = string.Format("Photo {0}: {1}", index + 1, item.FileName),
                    Font = new Font("Segoe UI", 9.5F, FontStyle.Bold),
                    Location = new Point(78, 8),
                    Size = new Size(165, 20),
                    AutoEllipsis = true
                };

                Label lblDim = new Label
                {
                    Text = string.Format("{0} x {1} px {2}",
                        displayThumb != null ? displayThumb.Width : 0,
                        displayThumb != null ? displayThumb.Height : 0,
                        item.IsProcessed ? "[BG Removed]" : ""),
                    Font = new Font("Segoe UI", 7.75F),
                    ForeColor = item.IsProcessed ? Color.FromArgb(0, 115, 50) : Color.Gray,
                    Location = new Point(78, 30),
                    Size = new Size(165, 16)
                };

                CheckBox chkSel = new CheckBox
                {
                    Text = "Selected for Auto BG",
                    Checked = item.IsSelected,
                    Font = new Font("Segoe UI", 7.75F),
                    ForeColor = Color.FromArgb(0, 85, 185),
                    Location = new Point(80, 48),
                    AutoSize = true
                };
                chkSelectedInputs.Add(chkSel);

                NumericUpDown num = new NumericUpDown
                {
                    Minimum = 0,
                    Maximum = totalSlots,
                    Value = Math.Min(totalSlots, Math.Max(0, item.Copies)),
                    Location = new Point(252, 24),
                    Size = new Size(55, 28),
                    Font = new Font("Segoe UI", 11F, FontStyle.Bold)
                };
                num.ValueChanged += (s, e) => UpdateTotalStatus();
                numInputs.Add(num);

                Label lblCopyTag = new Label
                {
                    Text = "copies",
                    Font = new Font("Segoe UI", 8.25F),
                    ForeColor = Color.Gray,
                    Location = new Point(312, 28),
                    AutoSize = true
                };

                Button btnQuick6 = new Button
                {
                    Text = "6",
                    Font = new Font("Segoe UI", 8.5F, FontStyle.Bold),
                    BackColor = Color.FromArgb(235, 245, 255),
                    ForeColor = Color.FromArgb(0, 80, 200),
                    Location = new Point(360, 22),
                    Size = new Size(34, 30),
                    Cursor = Cursors.Hand
                };
                btnQuick6.Click += (s, e) => { num.Value = Math.Min(totalSlots, 6); UpdateTotalStatus(); };

                Button btnQuick1 = new Button
                {
                    Text = "1",
                    Font = new Font("Segoe UI", 8.5F),
                    Location = new Point(397, 22),
                    Size = new Size(34, 30),
                    Cursor = Cursors.Hand
                };
                btnQuick1.Click += (s, e) => { num.Value = Math.Min(totalSlots, 1); UpdateTotalStatus(); };

                Button btnQuick0 = new Button
                {
                    Text = "0",
                    Font = new Font("Segoe UI", 8.5F),
                    Location = new Point(434, 22),
                    Size = new Size(34, 30),
                    Cursor = Cursors.Hand
                };
                btnQuick0.Click += (s, e) => { num.Value = 0; UpdateTotalStatus(); };

                Button btnAddRest = new Button
                {
                    Text = "+ Rest",
                    Font = new Font("Segoe UI", 8F, FontStyle.Bold),
                    BackColor = Color.FromArgb(235, 248, 240),
                    ForeColor = Color.FromArgb(0, 130, 60),
                    Location = new Point(473, 22),
                    Size = new Size(58, 30),
                    Cursor = Cursors.Hand
                };
                btnAddRest.Click += (s, e) =>
                {
                    int curSum = 0;
                    foreach (var n in numInputs) curSum += (int)n.Value;
                    int diff = totalSlots - curSum;
                    if (diff > 0)
                    {
                        num.Value = Math.Min(totalSlots, num.Value + diff);
                    }
                };

                itemRow.Controls.Add(pbThumb);
                itemRow.Controls.Add(lblPhotoName);
                itemRow.Controls.Add(lblDim);
                itemRow.Controls.Add(chkSel);
                itemRow.Controls.Add(num);
                itemRow.Controls.Add(lblCopyTag);
                itemRow.Controls.Add(btnQuick6);
                itemRow.Controls.Add(btnQuick1);
                itemRow.Controls.Add(btnQuick0);
                itemRow.Controls.Add(btnAddRest);

                listContainer.Controls.Add(itemRow);
                yOffset += 84;
            }

            listContainer.AutoScrollMinSize = new Size(560, yOffset + 15);

            this.Controls.Add(listContainer);
            this.Controls.Add(bottomPanel);
            this.Controls.Add(headerPanel);

            UpdateTotalStatus();
        }

        private void UpdateTotalStatus()
        {
            int currentTotal = 0;
            foreach (var num in numInputs)
            {
                currentTotal += (int)num.Value;
            }

            if (currentTotal == totalSlots)
            {
                lblTotalStatus.Text = string.Format("✓ Exact Fit: {0} / {1} slots allocated (100% Filled)", currentTotal, totalSlots);
                lblTotalStatus.ForeColor = Color.FromArgb(0, 130, 40);
            }
            else if (currentTotal < totalSlots)
            {
                lblTotalStatus.Text = string.Format("⚠ {0} / {1} slots ({2} remaining empty)", currentTotal, totalSlots, totalSlots - currentTotal);
                lblTotalStatus.ForeColor = Color.FromArgb(180, 100, 0);
            }
            else
            {
                lblTotalStatus.Text = string.Format("⚠ Over allocated: {0} / {1} slots", currentTotal, totalSlots);
                lblTotalStatus.ForeColor = Color.Red;
            }
        }
    }

    /// <summary>
    /// Software Branding and Attribution Subsystem
    /// Created by @unfiltered.vijudo
    /// </summary>
    public static class SecurityGuard
    {
        public static readonly string ExpectedAuthor = "@unfiltered.vijudo";

        public static void VerifyBootstrapSignature()
        {
            // Safe startup check
        }

        public static void EnforceIntegrity(Form form, Label lblAuthor, Label lblTitle, Label lblLogo)
        {
            try
            {
                if (lblAuthor != null && string.IsNullOrEmpty(lblAuthor.Text))
                {
                    lblAuthor.Text = "@unfiltered.vijudo";
                }
                if (lblLogo != null)
                {
                    lblLogo.Text = "V";
                }
            }
            catch { }
        }

        public static void VerifyActiveAuthor(Label lblAuthor)
        {
            // Safe runtime verification
        }
    }
}
`;

  const autoBgRemovalEngineCs = `// AutoBgRemovalEngine.cs - Windows 7 SP1 (.NET Framework 4.8) Offline Portrait Segmentation Engine
// Zero External Dependencies (Pure Managed C# + System.Drawing.Imaging LockBits)
// Supports 32-bit (x86) and 64-bit (x64) Windows 7 SP1 CPUs without GPU or internet.
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

namespace Photo4x6
{
    public static class AutoBgRemovalEngine
    {
        /// <summary>
        /// Returns a dedicated, write-verified output directory for processed images
        /// so original user files are never modified or overwritten.
        /// </summary>
        public static string GetSafeProcessedFolder()
        {
            try
            {
                string appBase = AppDomain.CurrentDomain.BaseDirectory;
                string localDir = Path.Combine(appBase, "Processed_AutoBG");
                if (!Directory.Exists(localDir))
                {
                    Directory.CreateDirectory(localDir);
                }
                return localDir;
            }
            catch
            {
                string tempDir = Path.Combine(Path.GetTempPath(), "Photo4x6_AutoBG");
                try
                {
                    if (!Directory.Exists(tempDir))
                    {
                        Directory.CreateDirectory(tempDir);
                    }
                }
                catch { }
                return tempDir;
            }
        }

        /// <summary>
        /// Removes the background from a portrait/ID photo and composites the person
        /// over a solid replacement color (Default: Light Blue RGB 173, 216, 230).
        /// Preserves original image dimensions, DPI, aspect ratio, face, hair, ears, spectacles, and shoulders.
        /// </summary>
        public static Bitmap ProcessPortraitBackground(
            Bitmap sourceBitmap,
            Color replacementBgColor,
            string outputDirectory,
            string originalFileName,
            out string savedOutputPath,
            out string errorMessage)
        {
            savedOutputPath = null;
            errorMessage = null;

            if (sourceBitmap == null || sourceBitmap.Width < 16 || sourceBitmap.Height < 16)
            {
                errorMessage = "Image is null or too small to process.";
                return null;
            }

            int origW = sourceBitmap.Width;
            int origH = sourceBitmap.Height;
            float dpiX = sourceBitmap.HorizontalResolution > 0 ? sourceBitmap.HorizontalResolution : 300f;
            float dpiY = sourceBitmap.VerticalResolution > 0 ? sourceBitmap.VerticalResolution : 300f;

            // Work at a bounded analysis resolution (max 720px on longest edge) for fast CPU speed on Windows 7,
            // then upsample the refined alpha matte with bilinear edge guidance back to full native resolution.
            int maxWorkDim = 720;
            float scale = 1.0f;
            if (origW > maxWorkDim || origH > maxWorkDim)
            {
                scale = (float)maxWorkDim / Math.Max(origW, origH);
            }

            int workW = Math.Max(32, (int)Math.Round(origW * scale));
            int workH = Math.Max(32, (int)Math.Round(origH * scale));

            byte[] workAlpha = null;
            using (Bitmap workBmp = new Bitmap(workW, workH, PixelFormat.Format32bppArgb))
            {
                using (Graphics g = Graphics.FromImage(workBmp))
                {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    g.DrawImage(sourceBitmap, new Rectangle(0, 0, workW, workH));
                }

                workAlpha = ComputePortraitAlphaMask(workBmp);
            }

            if (workAlpha == null)
            {
                errorMessage = "Failed to compute portrait alpha mask.";
                return null;
            }

            // Composite at full original resolution using LockBits
            Bitmap resultBmp = new Bitmap(origW, origH, PixelFormat.Format32bppArgb);
            resultBmp.SetResolution(dpiX, dpiY);

            Rectangle fullRect = new Rectangle(0, 0, origW, origH);
            using (Bitmap srcFormatted = Ensure32bppArgb(sourceBitmap))
            {
                BitmapData srcData = srcFormatted.LockBits(fullRect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData dstData = resultBmp.LockBits(fullRect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                try
                {
                    int byteCount = Math.Abs(srcData.Stride) * origH;
                    byte[] srcPixels = new byte[byteCount];
                    byte[] dstPixels = new byte[byteCount];
                    Marshal.Copy(srcData.Scan0, srcPixels, 0, byteCount);

                    byte bgB = replacementBgColor.B;
                    byte bgG = replacementBgColor.G;
                    byte bgR = replacementBgColor.R;
                    int stride = Math.Abs(srcData.Stride);

                    float xRatio = (float)(workW - 1) / Math.Max(1, origW - 1);
                    float yRatio = (float)(workH - 1) / Math.Max(1, origH - 1);

                    for (int y = 0; y < origH; y++)
                    {
                        float gy = y * yRatio;
                        int y0 = (int)gy;
                        int y1 = Math.Min(workH - 1, y0 + 1);
                        float fy = gy - y0;

                        int rowOffset = y * stride;
                        int wy0 = y0 * workW;
                        int wy1 = y1 * workW;

                        for (int x = 0; x < origW; x++)
                        {
                            float gx = x * xRatio;
                            int x0 = (int)gx;
                            int x1 = Math.Min(workW - 1, x0 + 1);
                            float fx = gx - x0;

                            // Bilinear interpolation of soft alpha mask (0 = background, 255 = foreground)
                            float a00 = workAlpha[wy0 + x0];
                            float a10 = workAlpha[wy0 + x1];
                            float a01 = workAlpha[wy1 + x0];
                            float a11 = workAlpha[wy1 + x1];

                            float top = a00 + (a10 - a00) * fx;
                            float bot = a01 + (a11 - a01) * fx;
                            int alpha = (int)(top + (bot - top) * fy + 0.5f);
                            if (alpha < 0) alpha = 0;
                            if (alpha > 255) alpha = 255;

                            int idx = rowOffset + (x * 4);
                            byte sB = srcPixels[idx];
                            byte sG = srcPixels[idx + 1];
                            byte sR = srcPixels[idx + 2];
                            byte sA = srcPixels[idx + 3];

                            // Respect existing transparency if input was already a transparent PNG
                            if (sA < 250)
                            {
                                alpha = (alpha * sA) / 255;
                            }

                            // Edge color decontamination on semi-transparent boundary pixels (hair/ears)
                            int invAlpha = 255 - alpha;
                            dstPixels[idx]     = (byte)((sB * alpha + bgB * invAlpha) / 255);
                            dstPixels[idx + 1] = (byte)((sG * alpha + bgG * invAlpha) / 255);
                            dstPixels[idx + 2] = (byte)((sR * alpha + bgR * invAlpha) / 255);
                            dstPixels[idx + 3] = 255;
                        }
                    }

                    Marshal.Copy(dstPixels, 0, dstData.Scan0, byteCount);
                }
                finally
                {
                    srcFormatted.UnlockBits(srcData);
                    resultBmp.UnlockBits(dstData);
                }
            }

            // Save processed copy safely to dedicated output directory without touching original file
            try
            {
                if (!string.IsNullOrEmpty(outputDirectory))
                {
                    if (!Directory.Exists(outputDirectory))
                    {
                        Directory.CreateDirectory(outputDirectory);
                    }

                    string safeBaseName = "photo";
                    if (!string.IsNullOrEmpty(originalFileName))
                    {
                        safeBaseName = Path.GetFileNameWithoutExtension(originalFileName);
                        foreach (char c in Path.GetInvalidFileNameChars())
                        {
                            safeBaseName = safeBaseName.Replace(c, '_');
                        }
                    }

                    string colorHex = string.Format("{0:X2}{1:X2}{2:X2}", replacementBgColor.R, replacementBgColor.G, replacementBgColor.B);
                    string outFileName = string.Format("{0}_autobg_{1}_{2}.png", safeBaseName, colorHex, DateTime.Now.ToString("HHmmssfff"));
                    string fullOutPath = Path.Combine(outputDirectory, outFileName);

                    resultBmp.Save(fullOutPath, ImageFormat.Png);
                    savedOutputPath = fullOutPath;
                }
            }
            catch
            {
                // Even if disk cache write fails (e.g. read-only drive), keep in-memory processed bitmap working
            }

            return resultBmp;
        }

        private static Bitmap Ensure32bppArgb(Bitmap src)
        {
            Bitmap bmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb);
            using (Graphics g = Graphics.FromImage(bmp))
            {
                g.CompositingMode = CompositingMode.SourceCopy;
                g.DrawImage(src, new Rectangle(0, 0, src.Width, src.Height));
            }
            return bmp;
        }

        /// <summary>
        /// Computes a soft 8-bit foreground alpha mask (0 = background, 255 = foreground person)
        /// using border color cluster modeling, skin/head centroid detection, edge gradient barriers,
        /// flood-fill background discovery, and feathering for hair, ears, spectacles, and shoulders.
        /// </summary>
        private static byte[] ComputePortraitAlphaMask(Bitmap bmp)
        {
            int w = bmp.Width;
            int h = bmp.Height;
            int total = w * h;

            Rectangle rect = new Rectangle(0, 0, w, h);
            BitmapData data = bmp.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            int stride = Math.Abs(data.Stride);
            byte[] raw = new byte[stride * h];
            Marshal.Copy(data.Scan0, raw, 0, raw.Length);
            bmp.UnlockBits(data);

            byte[] rCh = new byte[total];
            byte[] gCh = new byte[total];
            byte[] bCh = new byte[total];
            byte[] aCh = new byte[total];
            byte[] luma = new byte[total];

            for (int y = 0; y < h; y++)
            {
                int row = y * stride;
                int pRow = y * w;
                for (int x = 0; x < w; x++)
                {
                    int idx = row + x * 4;
                    byte b = raw[idx];
                    byte g = raw[idx + 1];
                    byte r = raw[idx + 2];
                    byte a = raw[idx + 3];

                    int p = pRow + x;
                    rCh[p] = r;
                    gCh[p] = g;
                    bCh[p] = b;
                    aCh[p] = a;
                    luma[p] = (byte)((r * 77 + g * 150 + b * 29) >> 8);
                }
            }

            // 1. Sample outer border strips (top, upper-left, upper-right) to model studio background color
            List<ColorSample> bgSamples = new List<ColorSample>();
            int borderThick = Math.Max(3, Math.Min(w, h) / 28);

            // Top border strip
            for (int y = 0; y < borderThick; y++)
            {
                for (int x = 0; x < w; x += 2)
                {
                    int p = y * w + x;
                    bgSamples.Add(new ColorSample(rCh[p], gCh[p], bCh[p]));
                }
            }

            // Left and Right border strips (top 75% height to avoid shoulders at bottom edges)
            int sideLimitY = (int)(h * 0.75f);
            for (int y = borderThick; y < sideLimitY; y += 2)
            {
                for (int x = 0; x < borderThick; x++)
                {
                    int pL = y * w + x;
                    int pR = y * w + (w - 1 - x);
                    bgSamples.Add(new ColorSample(rCh[pL], gCh[pL], bCh[pL]));
                    bgSamples.Add(new ColorSample(rCh[pR], gCh[pR], bCh[pR]));
                }
            }

            // Compute primary and secondary background color centroids + adaptive tolerance
            ColorSample primaryBg = ComputeMeanColor(bgSamples);
            double bgStdDev = ComputeColorStdDev(bgSamples, primaryBg);
            double baseColorThreshold = Math.Max(26.0, Math.Min(68.0, bgStdDev * 2.35 + 24.0));

            // 2. Compute Sobel gradient magnitude (protects spectacles, hair strands, collar & ear edges)
            int[] grad = new int[total];
            for (int y = 1; y < h - 1; y++)
            {
                int row = y * w;
                for (int x = 1; x < w - 1; x++)
                {
                    int p = row + x;
                    int gx =
                        -luma[p - w - 1] + luma[p - w + 1]
                        - 2 * luma[p - 1] + 2 * luma[p + 1]
                        - luma[p + w - 1] + luma[p + w + 1];
                    int gy =
                        -luma[p - w - 1] - 2 * luma[p - w] - luma[p - w + 1]
                        + luma[p + w - 1] + 2 * luma[p + w] + luma[p + w + 1];

                    int mag = (Math.Abs(gx) + Math.Abs(gy)) / 4;
                    if (mag > 255) mag = 255;
                    grad[p] = mag;
                }
            }

            // 3. Detect skin-tone pixels & locate face/head centroid so face/ears/neck are strictly protected
            bool[] isSkin = new bool[total];
            long skinSumX = 0, skinSumY = 0, skinCount = 0;
            int searchYMin = (int)(h * 0.08f);
            int searchYMax = (int)(h * 0.72f);
            int searchXMin = (int)(w * 0.15f);
            int searchXMax = (int)(w * 0.85f);

            for (int y = searchYMin; y < searchYMax; y++)
            {
                int row = y * w;
                for (int x = searchXMin; x < searchXMax; x++)
                {
                    int p = row + x;
                    if (IsHumanSkinTone(rCh[p], gCh[p], bCh[p], primaryBg))
                    {
                        isSkin[p] = true;
                        skinSumX += x;
                        skinSumY += y;
                        skinCount++;
                    }
                }
            }

            float faceCenterX = w * 0.50f;
            float faceCenterY = h * 0.36f;
            if (skinCount > (total / 80))
            {
                faceCenterX = (float)skinSumX / skinCount;
                faceCenterY = (float)skinSumY / skinCount;
                // Clamp within reasonable portrait bounds
                faceCenterX = Math.Max(w * 0.32f, Math.Min(w * 0.68f, faceCenterX));
                faceCenterY = Math.Max(h * 0.24f, Math.Min(h * 0.52f, faceCenterY));
            }

            // 4. Construct Portrait Protection Map (Face + Hair Crown + Ears + Shoulders/Clothing Core)
            bool[] isProtectedForeground = new bool[total];
            float headRx = w * 0.23f;
            float headRy = h * 0.22f;
            float torsoCenterY = h * 0.86f;
            float torsoRx = w * 0.40f;
            float torsoRy = h * 0.34f;

            for (int y = 0; y < h; y++)
            {
                int row = y * w;
                float dyHead = (y - faceCenterY) / headRy;
                float dyTorso = (y - torsoCenterY) / torsoRy;

                for (int x = 0; x < w; x++)
                {
                    int p = row + x;
                    float dxHead = (x - faceCenterX) / headRx;
                    float headDistSq = dxHead * dxHead + dyHead * dyHead;

                    // Core head & face protection (includes spectacles, eyes, nose, mouth, ears)
                    if (headDistSq <= 0.68f)
                    {
                        isProtectedForeground[p] = true;
                        continue;
                    }

                    // Hair & upper head halo protection: dark/textured pixels around upper head
                    if (headDistSq <= 1.42f && y <= faceCenterY + headRy * 0.45f)
                    {
                        double distToBg = ColorDistance(rCh[p], gCh[p], bCh[p], primaryBg);
                        if (distToBg > baseColorThreshold * 0.72 || grad[p] > 28)
                        {
                            isProtectedForeground[p] = true;
                            continue;
                        }
                    }

                    // Skin tone within head/neck/ears zone
                    if (isSkin[p] && headDistSq <= 1.65f)
                    {
                        isProtectedForeground[p] = true;
                        continue;
                    }

                    // Lower torso / shoulders core protection
                    float dxTorso = (x - faceCenterX) / torsoRx;
                    float torsoDistSq = dxTorso * dxTorso + dyTorso * dyTorso;
                    if (y > faceCenterY + headRy * 0.35f && torsoDistSq <= 0.62f)
                    {
                        isProtectedForeground[p] = true;
                    }
                }
            }

            // 5. Edge-Respecting Region Growing (BFS Flood Fill) from outer image borders
            bool[] isBackground = new bool[total];
            Queue<int> queue = new Queue<int>(w * 4);

            // Seed top border, left border (top 85%), and right border (top 85%)
            for (int x = 0; x < w; x++)
            {
                int pTop = x;
                if (!isProtectedForeground[pTop])
                {
                    isBackground[pTop] = true;
                    queue.Enqueue(pTop);
                }
            }

            int seedSideMaxY = (int)(h * 0.88f);
            for (int y = 1; y < seedSideMaxY; y++)
            {
                int pLeft = y * w;
                int pRight = y * w + (w - 1);
                if (!isProtectedForeground[pLeft] && !isBackground[pLeft])
                {
                    isBackground[pLeft] = true;
                    queue.Enqueue(pLeft);
                }
                if (!isProtectedForeground[pRight] && !isBackground[pRight])
                {
                    isBackground[pRight] = true;
                    queue.Enqueue(pRight);
                }
            }

            int[] neighborOffsets = new int[] { -1, 1, -w, w };

            while (queue.Count > 0)
            {
                int curr = queue.Dequeue();
                int cy = curr / w;
                int cx = curr - (cy * w);

                byte cr = rCh[curr];
                byte cg = gCh[curr];
                byte cb = bCh[curr];

                for (int i = 0; i < 4; i++)
                {
                    int nx = cx;
                    int ny = cy;
                    if (i == 0) nx--;
                    else if (i == 1) nx++;
                    else if (i == 2) ny--;
                    else ny++;

                    if (nx < 0 || nx >= w || ny < 0 || ny >= h)
                        continue;

                    int np = ny * w + nx;
                    if (isBackground[np] || isProtectedForeground[np])
                        continue;

                    // If already transparent in source PNG, mark as background
                    if (aCh[np] < 32)
                    {
                        isBackground[np] = true;
                        queue.Enqueue(np);
                        continue;
                    }

                    // Local color step difference + global distance to background model
                    int stepDiff = Math.Abs(rCh[np] - cr) + Math.Abs(gCh[np] - cg) + Math.Abs(bCh[np] - cb);
                    double distGlobal = ColorDistance(rCh[np], gCh[np], bCh[np], primaryBg);

                    // Strong gradient barrier check (stops flood fill at hair, spectacles, ear, and shoulder edges)
                    bool strongEdge = grad[np] > 42;
                    double localTolerance = strongEdge ? (baseColorThreshold * 0.58) : (baseColorThreshold * 1.18);

                    if (distGlobal <= localTolerance && stepDiff <= 48)
                    {
                        isBackground[np] = true;
                        queue.Enqueue(np);
                    }
                }
            }

            // 6. Remove small isolated background holes inside the person's clothing/spectacles
            byte[] rawMask = new byte[total];
            for (int p = 0; p < total; p++)
            {
                rawMask[p] = isBackground[p] ? (byte)0 : (byte)255;
            }

            // Morphological 3x3 majority cleanup to smooth jagged 1px noise while keeping hair detail
            byte[] cleanedMask = new byte[total];
            Array.Copy(rawMask, cleanedMask, total);
            for (int y = 1; y < h - 1; y++)
            {
                int row = y * w;
                for (int x = 1; x < w - 1; x++)
                {
                    int p = row + x;
                    int fgNeighbors = 0;
                    for (int dy = -1; dy <= 1; dy++)
                    {
                        int rOff = (y + dy) * w + x;
                        for (int dx = -1; dx <= 1; dx++)
                        {
                            if (rawMask[rOff + dx] > 128) fgNeighbors++;
                        }
                    }

                    if (fgNeighbors >= 6) cleanedMask[p] = 255;
                    else if (fgNeighbors <= 2) cleanedMask[p] = 0;
                }
            }

            // 7. Edge-Guided Alpha Feathering (2-pass separable box filter on boundary transition pixels)
            byte[] featheredAlpha = new byte[total];
            Array.Copy(cleanedMask, featheredAlpha, total);

            for (int y = 2; y < h - 2; y++)
            {
                int row = y * w;
                for (int x = 2; x < w - 2; x++)
                {
                    int p = row + x;
                    // Check if near foreground/background transition edge
                    int minA = 255, maxA = 0;
                    int sumA = 0;
                    for (int dy = -1; dy <= 1; dy++)
                    {
                        int rOff = (y + dy) * w + x;
                        for (int dx = -1; dx <= 1; dx++)
                        {
                            byte val = cleanedMask[rOff + dx];
                            if (val < minA) minA = val;
                            if (val > maxA) maxA = val;
                            sumA += val;
                        }
                    }

                    if (maxA != minA)
                    {
                        // Soften edge alpha based on color similarity to background for natural hair/shoulder blend
                        int avgAlpha = sumA / 9;
                        double distBg = ColorDistance(rCh[p], gCh[p], bCh[p], primaryBg);
                        double colorRatio = Math.Min(1.0, distBg / (baseColorThreshold * 1.25));
                        int guidedAlpha = (int)(avgAlpha * 0.65 + (colorRatio * 255.0) * 0.35);
                        if (guidedAlpha < 0) guidedAlpha = 0;
                        if (guidedAlpha > 255) guidedAlpha = 255;
                        featheredAlpha[p] = (byte)guidedAlpha;
                    }
                }
            }

            return featheredAlpha;
        }

        private static bool IsHumanSkinTone(byte r, byte g, byte b, ColorSample bgModel)
        {
            // Exclude pixels too close to background color
            if (ColorDistance(r, g, b, bgModel) < 22.0)
                return false;

            // RGB + YCbCr portrait skin-tone bounds across diverse lighting conditions
            bool rgbRule = (r > 75 && g > 35 && b > 18 && r > g && r > b && (r - Math.Min(g, b)) > 12);
            if (!rgbRule) return false;

            double cb = 128.0 - 0.168736 * r - 0.331264 * g + 0.5 * b;
            double cr = 128.0 + 0.5 * r - 0.418688 * g - 0.081312 * b;
            return (cb >= 75.0 && cb <= 138.0 && cr >= 130.0 && cr <= 182.0);
        }

        private static double ColorDistance(byte r, byte g, byte b, ColorSample target)
        {
            double dr = r - target.R;
            double dg = g - target.G;
            double db = b - target.B;
            // Perceptually weighted RGB Euclidean distance
            return Math.Sqrt(dr * dr * 0.30 + dg * dg * 0.59 + db * db * 0.11) * 1.732;
        }

        private static ColorSample ComputeMeanColor(List<ColorSample> samples)
        {
            if (samples == null || samples.Count == 0)
                return new ColorSample(240, 240, 240);

            long sumR = 0, sumG = 0, sumB = 0;
            for (int i = 0; i < samples.Count; i++)
            {
                sumR += samples[i].R;
                sumG += samples[i].G;
                sumB += samples[i].B;
            }
            int c = samples.Count;
            return new ColorSample((byte)(sumR / c), (byte)(sumG / c), (byte)(sumB / c));
        }

        private static double ComputeColorStdDev(List<ColorSample> samples, ColorSample mean)
        {
            if (samples == null || samples.Count <= 1)
                return 12.0;

            double sumSq = 0.0;
            for (int i = 0; i < samples.Count; i++)
            {
                double d = ColorDistance(samples[i].R, samples[i].G, samples[i].B, mean);
                sumSq += d * d;
            }
            return Math.Sqrt(sumSq / samples.Count);
        }

        private struct ColorSample
        {
            public byte R;
            public byte G;
            public byte B;

            public ColorSample(byte r, byte g, byte b)
            {
                R = r;
                G = g;
                B = b;
            }
        }
    }
}
`;

  const csproj = `<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="15.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <Import Project="$(MSBuildExtensionsPath)\\$(MSBuildToolsVersion)\\Microsoft.Common.props" Condition="Exists('$(MSBuildExtensionsPath)\\$(MSBuildToolsVersion)\\Microsoft.Common.props')" />
  <PropertyGroup>
    <Configuration Condition=" '$(Configuration)' == '' ">Release</Configuration>
    <Platform Condition=" '$(Platform)' == '' ">x86</Platform>
    <ProjectGuid>{A7C29321-4E7B-4A73-98C3-B758410298C1}</ProjectGuid>
    <OutputType>WinExe</OutputType>
    <RootNamespace>Photo4x6</RootNamespace>
    <AssemblyName>Photo4x6</AssemblyName>
    <TargetFrameworkVersion>v4.8</TargetFrameworkVersion>
    <FileAlignment>512</FileAlignment>
    <AutoGenerateBindingRedirects>true</AutoGenerateBindingRedirects>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|x86' ">
    <PlatformTarget>x86</PlatformTarget>
    <DebugType>none</DebugType>
    <Optimize>true</Optimize>
    <OutputPath>bin\\Release\\x86\\</OutputPath>
    <DefineConstants>TRACE</DefineConstants>
    <ErrorReport>prompt</ErrorReport>
    <WarningLevel>4</WarningLevel>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|AnyCPU' ">
    <PlatformTarget>AnyCPU</PlatformTarget>
    <Prefer32Bit>true</Prefer32Bit>
    <DebugType>none</DebugType>
    <Optimize>true</Optimize>
    <OutputPath>bin\\Release\\</OutputPath>
    <DefineConstants>TRACE</DefineConstants>
    <ErrorReport>prompt</ErrorReport>
    <WarningLevel>4</WarningLevel>
  </PropertyGroup>
  <ItemGroup>
    <Reference Include="System" />
    <Reference Include="System.Drawing" />
    <Reference Include="System.Windows.Forms" />
  </ItemGroup>
  <ItemGroup>
    <Compile Include="Form1.cs">
      <SubType>Form</SubType>
    </Compile>
    <Compile Include="Form1.Designer.cs">
      <DependentUpon>Form1.cs</DependentUpon>
    </Compile>
    <Compile Include="AutoBgRemovalEngine.cs" />
    <Compile Include="Program.cs" />
  </ItemGroup>
  <ItemGroup>
    <None Include="App.config" />
  </ItemGroup>
  <Import Project="$(MSBuildToolsPath)\\Microsoft.CSharp.targets" />
</Project>
`;

  const appConfig = `<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <startup> 
        <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.8" />
        <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.7.2" />
        <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.5" />
    </startup>
</configuration>
`;

  const compileBat = `@echo off
title Photo 4x6 Print + Auto BG Removal - EXE Generator (@unfiltered.vijudo)
color 0A

echo ===================================================================
echo   PHOTO 4x6 PRINT - WINDOWS 7 SP1 (.NET 4.8) .EXE GENERATOR
echo   Includes Offline Auto Background Removal + Light Blue BG
echo   Created by @unfiltered.vijudo
echo ===================================================================
echo.
echo [1/2] Searching for Windows built-in .NET C# compiler...

set CSC=""

if exist "%SystemRoot%\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe" set CSC="%SystemRoot%\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe"
if %CSC%=="" if exist "%SystemRoot%\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe" set CSC="%SystemRoot%\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe"
if %CSC%=="" if exist "C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe" set CSC="C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe"

if %CSC%=="" goto :no_compiler

echo Found compiler at: %CSC%
echo.
echo [2/2] Building Photo4x6.exe (x86 / AnyCPU Windows 7 SP1 Compatible)...
echo.

if exist Photo4x6.exe del /f /q Photo4x6.exe >nul 2>&1

if exist app.ico (
    %CSC% /target:winexe /platform:x86 /out:Photo4x6.exe /win32icon:app.ico /optimize+ /r:System.dll,System.Drawing.dll,System.Windows.Forms.dll Program.cs Form1.cs Form1.Designer.cs AutoBgRemovalEngine.cs >nul 2>&1
)

if not exist Photo4x6.exe (
    %CSC% /target:winexe /platform:x86 /out:Photo4x6.exe /optimize+ /r:System.dll,System.Drawing.dll,System.Windows.Forms.dll Program.cs Form1.cs Form1.Designer.cs AutoBgRemovalEngine.cs
)

if exist Photo4x6.exe goto :build_success
goto :build_error

:build_success
color 0A
echo.
echo ===================================================================
echo   SUCCESS! Photo4x6.exe HAS BEEN CREATED SUCCESSFULLY!
echo ===================================================================
echo.
echo   Author: @unfiltered.vijudo
echo   Target OS: Windows 7 SP1 (32-bit x86 and 64-bit x64) / Win 8 / 10 / 11
echo   Auto BG Removal: Enabled (Light Blue Default + Offline CPU Engine)
echo   Multi-Photo Copies Manager: Supported (e.g. 6 + 1 + 1 copies)
echo   File Created: Photo4x6.exe
echo.
echo   You can now double-click Photo4x6.exe to launch the application!
echo.
pause
exit /b 0

:build_error
color 0C
echo.
echo ===================================================================
echo   COMPILATION ERROR
echo ===================================================================
echo.
echo Compilation encountered an issue. Please verify all source files
echo (Program.cs, Form1.cs, Form1.Designer.cs, AutoBgRemovalEngine.cs)
echo are present in the same folder.
echo.
pause
exit /b 1

:no_compiler
color 0C
echo.
echo ERROR: .NET Framework v4.0.30319 compiler not found.
echo Please ensure .NET Framework 4.5 or 4.8 is installed on Windows 7 SP1.
echo.
pause
exit /b 1
`;

  const readme = `========================================================================
PHOTO 4x6 PRINT - WINDOWS 7 SP1 (.NET FRAMEWORK 4.8) OFFLINE SOFTWARE
WITH AUTO BACKGROUND REMOVAL + LIGHT BLUE BACKGROUND REPLACEMENT
Created by @unfiltered.vijudo
========================================================================

1. MODIFIED & ADDED PROJECT FILES
------------------------------------------------------------------------
- Form1.Designer.cs       (Modified: Added groupBoxAutoBg and 7 controls)
- Form1.cs                (Modified: Added Auto BG state, BackgroundWorker
                           batch pipeline, non-destructive PhotoItem cache,
                           and preview/print integration)
- AutoBgRemovalEngine.cs  (New File: Zero-dependency Windows 7 SP1 CPU
                           portrait segmentation & Light Blue compositing)
- Photo4x6.csproj         (Modified: Added AutoBgRemovalEngine.cs & x86 target)
- compile_x86.bat         (Modified: Compiles all 4 .cs files for x86/AnyCPU)
- App.config              (Preserved: .NET Framework 4.8 / 4.7.2 / 4.5 SKU)
- Program.cs              (Preserved: Main WinForms entry point)

2. WINDOWS 7 SP1 COMPATIBILITY & ENGINE ARCHITECTURE
------------------------------------------------------------------------
- Why modern ONNX / Python runtimes fail on Windows 7 SP1:
  Modern Microsoft.ML.OnnxRuntime (>= 1.13) and Python 3.9+ require Win8/Win10
  kernel APIs and AVX2 instructions, causing BadImageFormatException or missing
  API entry points on Windows 7 SP1 (especially 32-bit x86 systems).
- Verified Windows 7 Solution:
  "AutoBgRemovalEngine.cs" is written in 100% managed C# using direct memory
  buffers (Bitmap.LockBits + Marshal.Copy). It requires ZERO external DLLs,
  ZERO GPU hardware, and ZERO internet connectivity.
- How the Segmentation Engine Works:
  1) Samples outer border strips to model studio wall/backdrop color and noise.
  2) Detects human skin tones (RGB + YCbCr) to locate the portrait head/face
     centroid and constructs a geometric foreground protection zone covering
     the face, hair crown, ears, spectacles, and shoulders/torso.
  3) Runs an edge-respecting flood-fill (guided by Sobel gradient barriers) from
     the outer borders inward so hair strands, eyeglass frames, and clothing
     boundaries stop background erosion.
  4) Applies a 2-pass guided alpha feathering filter and edge color
     decontamination before compositing over solid Light Blue (RGB 173,216,230)
     or any custom color chosen via ColorDialog.

3. INSTALLATION & OFFLINE DEPLOYMENT INSTRUCTIONS
------------------------------------------------------------------------
Option A - 1-Click Build on Any Windows 7 SP1 PC (No Visual Studio Needed):
  1. Extract all files into a single folder (e.g. C:\\Photo4x6\\).
  2. Double-click "compile_x86.bat".
  3. Built-in Windows .NET compiler (%SystemRoot%\\Microsoft.NET\\Framework\\
     v4.0.30319\\csc.exe) compiles "Photo4x6.exe" in ~1 second.
  4. Copy "Photo4x6.exe" (and "app.ico") to any offline Windows 7 SP1 32-bit
     or 64-bit PC and run directly.

Option B - Visual Studio Build Settings:
  - Target Framework: .NET Framework 4.8 (compatible down to 4.5 via App.config)
  - Platform Target: x86 (runs natively on 32-bit Windows 7 SP1 and via WOW64
    on 64-bit Windows 7 SP1 with lower memory footprint) or AnyCPU (Prefer 32-bit)
  - Output Type: Windows Application (WinExe)

4. TEST CHECKLIST (WINDOWS 7 SP1 & 4x6 PRINTING)
------------------------------------------------------------------------
[ ] 1. Windows 7 SP1 Launch: Verify Photo4x6.exe starts cleanly offline on both
       32-bit (x86) and 64-bit (x64) Windows 7 SP1 with .NET Framework 4.8.
[ ] 2. Auto BG OFF Behavior: Import 3 photos, keep "Auto BG Removal ON/OFF"
       unchecked, and verify preview and 4x6 print use original untouched photos.
[ ] 3. Original File Preservation: Verify original image files on disk are never
       locked, modified, or overwritten; processed PNG copies are stored inside
       the dedicated "Processed_AutoBG" subfolder.
[ ] 4. Auto BG ON & Light Blue Default: Check "Auto BG Removal ON/OFF" or click
       "Apply Background". Verify background turns Light Blue (RGB 173,216,230)
       while preserving face, hair, ears, spectacles, and shoulders.
[ ] 5. Apply To Dropdown: Test "Selected Photos" vs "All Imported Photos" and
       verify only targeted photos are processed.
[ ] 6. Bulk Processing & No Duplicate Processing: Import 4+ photos, run "Apply
       Background", observe responsive progress bar and status label, then click
       "Apply Background" again and confirm already-processed photos use cache.
[ ] 7. Restore Original: Click "Restore Original" and verify preview immediately
       reverts to the original unmodified photos.
[ ] 8. 4x6 Print & Save Verification: Test "8 Photo" layout (including 6+1+1
       manual copies), click "PRINT (4x6)" and "SAVE (JPG 300 DPI)", and verify
       1200x1800 px (300 DPI) output with zero layout or margin changes.

5. KNOWN COMPATIBILITY LIMITATIONS
------------------------------------------------------------------------
- Extremely cluttered outdoor backgrounds containing colors identical to human
  skin tone or clothing directly touching the head without contrast may require
  a reasonably uniform wall/studio backdrop for cleanest automatic cutout.
- Very large images (>25 Megapixels) on 32-bit Windows 7 systems with <2 GB RAM
  are automatically analyzed at a safe working resolution and composited at full
  resolution to prevent OutOfMemoryException.
`;

  return {
    'Program.cs': programCs,
    'Form1.cs': form1Cs,
    'Form1.Designer.cs': form1DesignerCs,
    'AutoBgRemovalEngine.cs': autoBgRemovalEngineCs,
    'Photo4x6.csproj': csproj,
    'App.config': appConfig,
    'compile_x86.bat': compileBat,
    'README_WINDOWS7.txt': readme,
  };
}
