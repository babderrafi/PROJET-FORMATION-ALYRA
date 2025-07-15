package com.nftcar.alyra.repository;

import com.nftcar.alyra.domain.NFTLevel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NFTLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NFTLevelRepository extends JpaRepository<NFTLevel, Long> {}
