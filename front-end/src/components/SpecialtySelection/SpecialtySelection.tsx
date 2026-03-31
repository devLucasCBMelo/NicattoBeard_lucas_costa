import styles from './index.module.css';

interface Specialty {
  id: string;
  name: string;
}

interface SpecialtySelectionProps {
  selectedSpecialtyId: string;
  setSelectedSpecialtyId: React.Dispatch<React.SetStateAction<string>>;
  specialties: Specialty[];
  disabled?: boolean;
}

export default function SpecialtySelection({
  selectedSpecialtyId,
  setSelectedSpecialtyId,
  specialties,
  disabled = false,
}: SpecialtySelectionProps) {
  return (
    <section className={styles.section4}>
      <h2 className={styles.section_title}>
        <span className={styles.circle_background}>4</span>{' '}
        <span className={styles.section_title_text}>
          Escolha a especialidade
        </span>
      </h2>

      <div className={styles.section4_content}>
        <select
          value={selectedSpecialtyId}
          onChange={(event) => setSelectedSpecialtyId(event.target.value)}
          disabled={disabled}
          className={styles.custom_select}
        >
          <option value=''>Selecione uma especialidade</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
