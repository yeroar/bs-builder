import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colorMaps } from './tokens/colorMaps';
import { typographyStyles } from './tokens/typography';
import StackControl from './TopNav/StackControl';
import NavTagSolidIcon from './icons/NavTagSolidIcon';
import NavExchangeSolidIcon from './icons/NavExchangeSolidIcon';
import NavBankSolidIcon from './icons/NavBankSolidIcon';
import NavTagDuoIcon from './icons/NavTagDuoIcon';
import NavExchangeDuoIcon from './icons/NavExchangeDuoIcon';
import NavBankDuoIcon from './icons/NavBankDuoIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import MenuIcon from './icons/MenuIcon';
import BellIcon from './icons/BellIcon';
import ClockIcon from './icons/ClockIcon';
import XCloseIcon from './icons/XCloseIcon';
import FoldPageViewHeader from './TopNav/FoldPageViewHeader';
import PrimaryHeader from './headers/PrimaryHeader';
import SecondaryHeader from './headers/SecondaryHeader';
import SearchHeader from './headers/SearchHeader';
import TransactionHeader from './headers/TransactionHeader';
import ProgressIndicator from './Feedback/ProgressIndicator';
import Validation from './Feedback/Validation';
import ValidationGroup from './Feedback/ValidationGroup';
import Footnote from './Input/footnote/Footnote';
import Chip from './Chip/Chip';
import TextContainer from './Input/TextContainer/TextContainer';
import TextField from './Input/TextContainer/TextField';
import AlertCircleIcon from './icons/AlertCircleIcon';
import InfoCircleIcon from './icons/InfoCircleIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ArrowNarrowLeftIcon from './icons/ArrowNarrowLeftIcon';
import ArrowNarrowRightIcon from './icons/ArrowNarrowRightIcon';
import BankIcon from './icons/BankIcon';
import XCircleIcon from './icons/XCircleIcon';
import Message from './Message';
import ListItem from './ListItem';
import { Button } from './Buttons/Button';
import { FoldText } from './Primitives/FoldText';
import { IconContainer } from './IconContainer';

interface IconItemProps {
  Icon: React.FC<any>;
  name: string;
  token?: string;
}

const IconItem: React.FC<IconItemProps> = ({ Icon, name, token = 'face.primary' }) => (
  <View style={styles.iconCard}>
    <View style={styles.iconWrapper}>
      <Icon width={24} height={24} color={colorMaps.face.primary} />
    </View>
    <View style={styles.iconMeta}>
      <Text style={[styles.iconLabel, typographyStyles['body-xs-bold']]}>
        {name}
      </Text>
      <Text style={[styles.tokenLabel, typographyStyles['caption']]}>
        {token}
      </Text>
    </View>
  </View>
);

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionLine} />
    <Text style={[styles.sectionTitle, typographyStyles['header-sm']]}>{title}</Text>
    {description && <Text style={[styles.sectionDescription, typographyStyles['body-sm']]}>{description}</Text>}
  </View>
);

const IconLibrary = () => {
  return (
    <View style={styles.canvas}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.docHeader}>
          <Text style={[styles.docTag, typographyStyles['caption']]}>REFERENCE / UI KIT</Text>
          <Text style={[styles.docTitle, typographyStyles['header-xl']]}>Component Library</Text>
          <View style={styles.divider} />
          <Text style={[styles.docSubtitle, typographyStyles['body-md']]}>
            Technical specifications and interactive demos for core design components.
          </Text>
        </View>

        <SectionHeader
          title="System Icons"
          description="Standard 24x24 icons for navigation and utility."
        />
        <View style={styles.grid}>
          <IconItem Icon={NavTagSolidIcon} name="NavTagSolidIcon" />
          <IconItem Icon={NavTagDuoIcon} name="NavTagDuoIcon" token="face.tertiary" />
          <IconItem Icon={NavExchangeSolidIcon} name="NavExchangeSolidIcon" />
          <IconItem Icon={NavExchangeDuoIcon} name="NavExchangeDuoIcon" token="face.tertiary" />
          <IconItem Icon={NavBankSolidIcon} name="NavBankSolidIcon" />
          <IconItem Icon={NavBankDuoIcon} name="NavBankDuoIcon" token="face.tertiary" />
          <IconItem Icon={ChevronLeftIcon} name="ChevronLeftIcon" />
          <IconItem Icon={ChevronRightIcon} name="ChevronRightIcon" />
          <IconItem Icon={MenuIcon} name="MenuIcon" />
          <IconItem Icon={BellIcon} name="BellIcon" />
          <IconItem Icon={ClockIcon} name="ClockIcon" />
          <IconItem Icon={XCloseIcon} name="XCloseIcon" />
          <IconItem Icon={AlertCircleIcon} name="AlertCircleIcon" />
          <IconItem Icon={InfoCircleIcon} name="InfoCircleIcon" />
          <IconItem Icon={ChevronDownIcon} name="ChevronDownIcon" token="face.tertiary" />
          <IconItem Icon={CheckCircleIcon} name="CheckCircleIcon" />
          <IconItem Icon={ArrowNarrowLeftIcon} name="ArrowNarrowLeftIcon" />
          <IconItem Icon={ArrowNarrowRightIcon} name="ArrowNarrowRightIcon" />
          <IconItem Icon={BankIcon} name="BankIcon" />
          <IconItem Icon={XCircleIcon} name="XCircleIcon" />
        </View>

        <SectionHeader
          title="Top Navigation"
          description="Variants for the FoldPageViewHeader system."
        />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: ROOT</Text>
            <FoldPageViewHeader
              variant="root"
              leftComponent={<StackControl variant="left" leadingSlot={<MenuIcon />} />}
              rightComponent={
                <StackControl
                  variant="right"
                  leadingSlot={<ClockIcon />}
                  trailingSlot={<BellIcon />}
                />
              }
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: FULLSCREEN</Text>
            <FoldPageViewHeader
              variant="fullscreen"
              title="Page Title"
              subTitle="Secondary info"
              leftComponent={<StackControl variant="left" leadingSlot={<ChevronLeftIcon />} />}
              rightComponent={<StackControl variant="right" trailingSlot={<XCloseIcon />} />}
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: PROGRESSIVE</Text>
            <FoldPageViewHeader
              variant="progressive"
              step={<ProgressIndicator variant="02" />}
              leftComponent={<StackControl variant="left" leadingSlot={<ChevronLeftIcon />} />}
            />
          </View>
        </View>

        <SectionHeader title="Header Variants" description="Primary header with actions and text configurations." />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>PRIMARY HEADER (FULL)</Text>
            <TransactionHeader
              title="n,nnn sats"
              subheader="{transactionType}"
              footnote="Day Mon DD YYYY, HH:MM AM"
              leadingSlot={
                <Chip
                  label="Push to cardip"
                  leadingSlot={<CheckCircleIcon />}
                  onPress={() => { }}
                />
              }
              trailingSlot={
                <Chip
                  label="Withdrawal pending settlement"
                  leadingSlot={<ClockIcon />}
                  onPress={() => { }}
                />
              }
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>PRIMARY HEADER (COMPACT)</Text>
            <PrimaryHeader
              header="Confirm your email"
              body="We sent a verification code to your email. Please enter it below to continue."
              leadingSlot={<Button label="Resend Email" hierarchy="secondary" size="lg" onPress={() => { }} />}
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>SECONDARY HEADER</Text>
            <SecondaryHeader
              title="Reset your password"
              body="Enter the email address associated with your account and we'll send you a link to reset your password."
              leadingSlot={<Button label="Send Link" hierarchy="primary" size="lg" onPress={() => { }} />}
              trailingSlot={<Button label="Cancel" hierarchy="tertiary" size="lg" onPress={() => { }} />}
              disclaimer="Cannot access your email? Contact support."
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>SEARCH HEADER</Text>
            <SearchHeader
              title="History"
              actionLabel="View All"
              onActionPress={() => { }}
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>TRANSACTION HEADER (WITH CHIPS)</Text>
            <TransactionHeader
              title="50,000 sats"
              subheader="Amazon Gift Card"
              footnote="Today, 2:45 PM"
              leadingSlot={<Chip label="View Receipt" type="primary" />}
              trailingSlot={<Chip label="Completed" type="success" bold />}
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>TRANSACTION HEADER (MINIMAL)</Text>
            <TransactionHeader
              title="250 sats"
              subheader="Fold Card Reward"
              footnote="Yesterday, 11:20 AM"
            />
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>TRANSACTION HEADER (DEBIT/CREDIT)</Text>
            <TransactionHeader
              title="$45.80"
              subheader="Amazon.com"
              footnote="Jan 24, 2026"
              leadingSlot={<Button label="Support" hierarchy="secondary" size="xs" onPress={() => { }} />}
            />
          </View>


        </View>

        <SectionHeader title="Feedback Indicators" />
        <View style={styles.demoGrid}>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>P1 (25%)</Text>
            <ProgressIndicator variant="01" />
          </View>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>P2 (50%)</Text>
            <ProgressIndicator variant="02" />
          </View>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>P3 (75%)</Text>
            <ProgressIndicator variant="03" />
          </View>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>P4 (100%)</Text>
            <ProgressIndicator variant="04" />
          </View>
        </View>

        <SectionHeader title="Validation Labels" description="Inline status messages with icons." />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>TYPE: SUCCESS</Text>
            <Validation label="Validation successful" type="success" />
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>TYPE: DANGER</Text>
            <Validation label="Validation failed" type="danger" />
          </View>
        </View>

        <SectionHeader title="Chip Tokens" />
        <View style={styles.chipGallery}>
          <View style={styles.demoItem}><Chip label="Primary Bold" type="primary" bold /></View>
          <View style={styles.demoItem}><Chip label="Primary" type="primary" bold={false} /></View>
          <View style={styles.demoItem}><Chip label="Accent Bold" type="accent" bold /></View>
          <View style={styles.demoItem}><Chip label="Accent" type="accent" bold={false} /></View>
          <View style={styles.demoItem}><Chip label="Success Bold" type="success" bold /></View>
          <View style={styles.demoItem}><Chip label="Success" type="success" bold={false} /></View>
        </View>

        <SectionHeader title="Input Containers" />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>DEFAULT</Text>
            <TextContainer placeholder="Placeholder text" />
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>FOCUSED W/ CHIP</Text>
            <TextContainer
              state="focused"
              leadingSlot={<Chip label="Label" type="primary" />}
              placeholder="Value"
            />
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>ERROR W/ ICON</Text>
            <TextContainer
              state="error"
              value="Invalid input"
              trailingSlot={<AlertCircleIcon width={16} height={16} color={colorMaps.face.negativeBold} />}
            />
          </View>
        </View>

        <SectionHeader title="Form Fields (TextField)" />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <TextField
              label="Full Name"
              placeholder="John Doe"
              footer="As it appears on your ID"
              footerType="info"
            />
          </View>
          <View style={styles.demoBox}>
            <TextField
              label="Email Address"
              value="john@invalid"
              state="error"
              error={true}
              footer="Please enter a valid email"
            />
          </View>
        </View>

        <SectionHeader title="Messages (Banner)" />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: INFORMATION</Text>
            <Message
              title="System Notice"
              message="Your account verification is in progress. This may take up to 24 hours."
              variant="information"
              actionLabel="View Status"
              hasButton={true}
            />
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: WARNING</Text>
            <Message
              message="Your session will expire in 5 minutes. Please save your work."
              variant="warning"
              hasButton={false}
            />
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: ERROR</Text>
            <Message
              title="Transaction Failed"
              message="We couldn't process your request. Please check your connection."
              variant="error"
              actionLabel="Retry"
              hasButton={true}
            />
          </View>
        </View>

        <SectionHeader title="Brand Icons" description="Brand logos with fallback support." />
        <View style={styles.demoGrid}>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>Walmart (LG)</Text>
            <IconContainer brand="walmart" size="lg" />
          </View>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>Chewy (MD)</Text>
            <IconContainer brand="chewy" size="md" />
          </View>
          <View style={styles.demoItem}>
            <Text style={styles.demoLabel}>Fallback (SM)</Text>
            <IconContainer brand="unknown" size="sm" />
          </View>
        </View>

        <SectionHeader title="List Items (Unified)" />
        <View style={styles.specColumn}>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: GIFTCARD (SECONDARY BOLD+BELOW)</Text>
            <ListItem
              variant="giftCard"
              title="Walmart"
              secondaryText="Up to 5% sats back"
              tertiaryText="Online and in-store"
              leadingSlot={<IconContainer brand="walmart" size="lg" />}
              onPress={() => { }}
            />
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoLabel}>VARIANT: PAYMENTMETHOD (SECONDARY ON TOP)</Text>
            <ListItem
              variant="paymentmethod"
              title="Chase Checking"
              secondaryText="...4455"
              tertiaryText="No fees"
              leadingSlot={<IconContainer brand="chewy" size="lg" />}
              onPress={() => { }}
            />
          </View>
        </View>

        <SectionHeader title="Design System Status" />
        <View style={styles.statusSection}>
          <View style={styles.statusRow}>
            <View style={[styles.colorSwatch, { backgroundColor: colorMaps.face.primary }]} />
            <Text style={[styles.statusText, typographyStyles['body-sm-bold']]}>face.primary</Text>
            <Text style={[styles.hexText, typographyStyles['caption']]}>{colorMaps.face.primary}</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={[styles.colorSwatch, { backgroundColor: colorMaps.layer.background }]} />
            <Text style={[styles.statusText, typographyStyles['body-sm-bold']]}>layer.background</Text>
            <Text style={[styles.hexText, typographyStyles['caption']]}>{colorMaps.layer.background}</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={[styles.colorSwatch, { backgroundColor: colorMaps.object.tertiary.default }]} />
            <Text style={[styles.statusText, typographyStyles['body-sm-bold']]}>object.tertiary</Text>
            <Text style={[styles.hexText, typographyStyles['caption']]}>{colorMaps.object.tertiary.default}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, typographyStyles['caption']]}>
            Generated by Antigravity • Version 1.2
          </Text>
        </View>
      </ScrollView >
    </View >
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colorMaps.special?.offWhite || '#F8F9FA',
  },
  container: {
    padding: 32,
    paddingTop: 64,
  },
  docHeader: {
    marginBottom: 48,
  },
  docTag: {
    color: colorMaps.face.tertiary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  docTitle: {
    color: colorMaps.face.primary,
    fontSize: 32,
    fontWeight: '800',
  },
  docSubtitle: {
    color: colorMaps.face.secondary,
    lineHeight: 24,
    maxWidth: 600,
  },
  divider: {
    height: 4,
    width: 48,
    backgroundColor: colorMaps.face.primary,
    marginVertical: 24,
  },
  sectionHeader: {
    marginTop: 48,
    marginBottom: 24,
  },
  sectionLine: {
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
    marginBottom: 16,
  },
  sectionTitle: {
    color: colorMaps.face.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionDescription: {
    color: colorMaps.face.tertiary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconCard: {
    width: '31%',
    backgroundColor: colorMaps.layer.primary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: colorMaps.layer.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconMeta: {
    alignItems: 'center',
  },
  iconLabel: {
    color: colorMaps.face.primary,
    textAlign: 'center',
    fontSize: 10,
  },
  tokenLabel: {
    color: colorMaps.face.tertiary,
    fontSize: 8,
    marginTop: 2,
  },
  specColumn: {
    gap: 24,
  },
  demoBox: {
    backgroundColor: colorMaps.layer.primary,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    overflow: 'hidden',
  },
  demoLabel: {
    ...typographyStyles['caption'],
    color: colorMaps.face.tertiary,
    marginBottom: 12,
    fontWeight: '700',
  },
  demoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  demoItem: {
    backgroundColor: colorMaps.layer.primary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    alignItems: 'center',
    minWidth: 80,
  },
  chipGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusSection: {
    backgroundColor: colorMaps.layer.primary,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
  },
  statusText: {
    flex: 1,
    color: colorMaps.face.primary,
  },
  hexText: {
    color: colorMaps.face.tertiary,
    backgroundColor: colorMaps.layer.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  footer: {
    marginTop: 64,
    paddingBottom: 64,
    alignItems: 'center',
  },
  footerText: {
    color: colorMaps.face.tertiary,
    opacity: 0.5,
  },
});


export default IconLibrary;
