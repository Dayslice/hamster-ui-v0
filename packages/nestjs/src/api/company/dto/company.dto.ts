// company.dto.ts
import { FormField } from 'src/decorators/formField.decorator';

export class CreateCompanyDto {
  @FormField({ label: 'Company Label', type: 'text' })
  label: string;

  @FormField({ label: 'Business Goals', type: 'text', optional: true })
  business_goals?: string;

  @FormField({ label: 'Company Overview', type: 'text' })
  description: string;

  @FormField({ label: 'Top Competitors', type: 'text' })
  competitors: string;

  @FormField({ label: 'Marketing URL', type: 'text' })
  url: string;

  @FormField({ label: 'Elevator Pitch', type: 'text' })
  elevator_pitch: string;

  // ... other fields ...
}
